import {
  Component,
  Input,
  OnChanges,
  Type,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ContentAuthorComponent } from '../content-author/content-author.component';
import { GaleryPostComponent } from '../galery-post/galery-post.component';

// ── Tipos internos ────────────────────────────────────────────────────────────

interface HtmlSegment {
  kind: 'html';
  safeHtml: SafeHtml;
}

interface ComponentSegment {
  kind: 'component';
  componentType: Type<unknown>;
  inputs: Record<string, unknown>;
}

type ContentSegment = HtmlSegment | ComponentSegment;

// ── Registro de componentes dinámicos ─────────────────────────────────────────
//
// Para agregar un nuevo componente reutilizable:
//   1. Importarlo arriba.
//   2. Agregarlo aquí con la clave que uses en el JSON de WordPress como "type".
//   3. Indicar el nombre exacto del @Input() que recibe la data.
//
interface ComponentEntry {
  component: Type<unknown>;
  /** Nombre del @Input() del componente que recibirá `data` del JSON. */
  inputName: string;
}

const COMPONENT_REGISTRY: Record<string, ComponentEntry> = {
  'content-author': {
    component: ContentAuthorComponent,
    inputName: 'datesAuthor',
  },
  'galery-post': {
    component: GaleryPostComponent,
    inputName: 'itemIniciales', // GaleryPostComponent usa datos internos; se puede ampliar
  },
  // Agregar aquí los próximos componentes:
  // 'block-text':   { component: BlockTextComponent,  inputName: 'data' },
  // 'gallery-slider': { component: GallerySliderComponent, inputName: 'data' },
};

// ── Regex de parsing (SSR-safe, sin DOM APIs) ─────────────────────────────────
//
// Formato esperado en el campo `content` de WordPress:
//
//   <script type="application/json" data-component-id="ID">
//     { "type": "content-author", "data": { ... } }
//   </script>
//   [ng-component id="ID"]
//
// NOTA: WordPress puede convertir las comillas rectas " del shortcode en
// comillas tipográficas (“ ” « »). El grupo de caracteres WP_QUOTES las acepta
// todas para que el match no falle en ningún caso.
//
const WP_QUOTES = '["\u201C\u201D\u00AB\u00BB]';
const COMPONENT_BLOCK_REGEX = new RegExp(
  `<script\\s+type="application\/json"\\s+data-component-id="([^"]+)">[\\s\\S]*?<\/script>\\s*\\[ng-component\\s+id=${WP_QUOTES}([^"\u201C\u201D\u00AB\u00BB]+)${WP_QUOTES}\\]`,
  'g'
);

@Component({
  selector: 'app-dynamic-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (segment of segments; track $index) {
      @if (segment.kind === 'html') {
        <div [innerHTML]="segment.safeHtml"></div>
      } @else if (segment.kind === 'component') {
        <ng-container
          [ngComponentOutlet]="segment.componentType"
          [ngComponentOutletInputs]="segment.inputs">
        </ng-container>
      }
    }
  `,
})
export class DynamicContentComponent implements OnChanges {
  /** HTML crudo proveniente del campo `content` de WordPress. */
  @Input() content = '';

  segments: ContentSegment[] = [];

  private readonly sanitizer = inject(DomSanitizer);

  ngOnChanges(): void {
    this.segments = this.parseContent(this.content);
  }

  // ── Parser ──────────────────────────────────────────────────────────────────

  private parseContent(raw: string): ContentSegment[] {
    if (!raw?.trim()) return [];

    // Limpieza previa: WordPress a veces envuelve bloques <script> en otro
    // <script data-wp-block-html="js"> generando contenido duplicado.
    const clean = this.stripWpArtifacts(raw);

    const result: ContentSegment[] = [];
    let lastIndex = 0;

    // Reiniciamos lastIndex del regex global antes de iterar
    COMPONENT_BLOCK_REGEX.lastIndex = 0;

    let match: RegExpExecArray | null;

    while ((match = COMPONENT_BLOCK_REGEX.exec(clean)) !== null) {
      const [fullMatch, jsonId] = match;
      // Grupo 1 = data-component-id del <script>, Grupo 2 = id del shortcode
      const shortcodeId = match[2];

      // Los IDs deben coincidir (consistencia)
      if (jsonId !== shortcodeId) {
        console.warn(
          `[DynamicContentComponent] IDs desincronizados: script="${jsonId}" shortcode="${shortcodeId}"`
        );
        continue;
      }

      // Segmento HTML previo al bloque de componente
      const htmlBefore = clean.slice(lastIndex, match.index);
      if (htmlBefore.trim()) {
        result.push(this.makeHtmlSegment(htmlBefore));
      }

      // Extraer el cuerpo JSON directamente del match completo
      const jsonBody = this.extractJsonBody(fullMatch);

      // Intentar parsear el JSON y resolver el componente
      const componentSegment = this.tryBuildComponentSegment(jsonBody);
      if (componentSegment) {
        result.push(componentSegment);
      } else {
        console.warn(
          `[DynamicContentComponent] No se pudo resolver el componente para id="${jsonId}". JSON: ${jsonBody}`
        );
      }

      lastIndex = match.index + fullMatch.length;
    }

    // HTML restante después del último bloque
    const htmlAfter = clean.slice(lastIndex);
    if (htmlAfter.trim()) {
      result.push(this.makeHtmlSegment(htmlAfter));
    }

    return result;
  }

  /**
   * Extrae el cuerpo JSON del bloque completo capturado.
   * Busca entre el primer `>` (cierre del tag <script>) y el `</script>`.
   */
  private extractJsonBody(fullMatch: string): string {
    const start = fullMatch.indexOf('>') + 1;
    const end = fullMatch.indexOf('<\/script>') !== -1
      ? fullMatch.indexOf('<\/script>')
      : fullMatch.indexOf('</script>');
    return end > start ? fullMatch.slice(start, end).trim() : '';
  }

  /**
   * Elimina artefactos que WordPress Gutenberg genera al guardar bloques HTML:
   *   - <script data-wp-block-html="js">...<\/script>  (duplicado del bloque original)
   * Estos wrappers causan contenido duplicado y deben descartarse.
   */
  private stripWpArtifacts(raw: string): string {
    return raw.replace(/<script\s+data-wp-block-html=["'][^"']*["'][\s\S]*?<\/script>/g, '');
  }

  private tryBuildComponentSegment(jsonBody: string): ComponentSegment | null {
    let parsed: { type?: string; data?: unknown };
    try {
      parsed = JSON.parse(jsonBody);
    } catch {
      return null;
    }

    const type = parsed?.type;
    if (!type || typeof type !== 'string') return null;

    const entry = COMPONENT_REGISTRY[type];
    if (!entry) {
      console.warn(`[DynamicContentComponent] Tipo de componente desconocido: "${type}"`);
      return null;
    }

    return {
      kind: 'component',
      componentType: entry.component,
      inputs: { [entry.inputName]: parsed.data ?? {} },
    };
  }

  private makeHtmlSegment(html: string): HtmlSegment {
    return {
      kind: 'html',
      safeHtml: this.sanitizer.bypassSecurityTrustHtml(html),
    };
  }
}
