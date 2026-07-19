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
import { BlockContentComponent } from '../block-content/block-content.component';
import { IndexButtonsComponent } from '../index-buttons/index-buttons.component';

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
  'block-content': {
    component: BlockContentComponent,
    inputName: 'blockContent',
  },
  'index-buttons': {
    component: IndexButtonsComponent,
    inputName: 'categories',
  },
  // Agregar aquí los próximos componentes:
  // 'block-text':   { component: BlockTextComponent,  inputName: 'data' },
  // 'gallery-slider': { component: GallerySliderComponent, inputName: 'data' },
};

// Regex de parsing (SSR-safe, sin DOM APIs)
//
// Formato esperado en el campo `content` de WordPress:
//
//   <script type="application/json" data-component-id="opcional-solo-debug">
//     { "type": "content-author", "data": { ... } }
//   </script>
//   [ng-component]
//
// El marcador NO lleva id: el emparejamiento con su <script> es siempre por
// posicion en el texto (el primer [ng-component] despues de un </script> le
// pertenece a ese script), asi que no hay nada que WordPress pueda
// desincronizar. Antes el marcador era `[ng-component id="ID"]`, pero
// wptexturize corrompia las comillas de forma impredecible (tipograficas,
// angulares, e incluso el simbolo de pulgada `&#8243;` pegado a un numero) y
// obligaba a mantener dos IDs sincronizados a mano.
const COMPONENT_BLOCK_REGEX =
  /<script\s+type="application\/json"(?:\s+data-component-id="([^"]*)")?\s*>([\s\S]*?)<\/script>\s*\[ng-component\]/g;

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
      const [fullMatch, debugId, jsonBody] = match;

      // Segmento HTML previo al bloque de componente
      const htmlBefore = clean.slice(lastIndex, match.index);
      if (htmlBefore.trim()) {
        result.push(this.makeHtmlSegment(htmlBefore));
      }

      // Intentar parsear el JSON y resolver el componente
      const componentSegment = this.tryBuildComponentSegment(jsonBody.trim());
      if (componentSegment) {
        result.push(componentSegment);
      } else {
        console.warn(
          `[DynamicContentComponent] No se pudo resolver el componente${debugId ? ` (id="${debugId}")` : ''}. JSON: ${jsonBody}`
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
   * Elimina/normaliza artefactos que WordPress Gutenberg genera al guardar bloques:
   *   - <script data-wp-block-html="js">...<\/script>  (duplicado del bloque original)
   *   - El bloque de código o el shortcode [ng-component] envueltos en su propio
   *     <p class="wp-block-paragraph">...</p> (wpautop puede separarlos del
   *     <script> si no quedaron en el mismo bloque "HTML personalizado").
   * Sin este "desenvolvimiento" el regex principal no los reconoce como
   * contiguos y el componente nunca se resuelve.
   */
  private stripWpArtifacts(raw: string): string {
    let clean = raw.replace(/<script\s+data-wp-block-html=["'][^"']*["'][\s\S]*?<\/script>/g, '');

    clean = clean.replace(
      /<p[^>]*>\s*(\[ng-component\])\s*<\/p>/gi,
      '$1'
    );

    clean = clean.replace(
      /<p[^>]*>\s*(<script\s+type="application\/json"[\s\S]*?<\/script>)\s*<\/p>/gi,
      '$1'
    );

    return clean;
  }

  private tryBuildComponentSegment(jsonBody: string): ComponentSegment | null {
    const parsed = this.parseLenientJson(jsonBody);
    if (!parsed) return null;

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

  /**
   * Intenta JSON.parse estricto primero. Si falla, normaliza sintaxis de
   * objeto JS habitual (claves sin comillas, comillas simples, comas
   * colgantes) — lo que se suele pegar por error copiando el mock de
   * TypeScript — y reintenta. Si aun así falla, loguea el error real.
   */
  private parseLenientJson(jsonBody: string): { type?: string; data?: unknown } | null {
    try {
      return JSON.parse(jsonBody);
    } catch {
      // sigue con el intento permisivo
    }

    const normalized = jsonBody
      // claves sin comillas: { foo: ... } o , foo: ...  →  "foo":
      .replace(/([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":')
      // comillas simples de string → dobles (sin tocar comillas dobles internas)
      .replace(/'((?:\\.|[^'\\])*)'/g, (_m, inner: string) => `"${inner.replace(/"/g, '\\"')}"`)
      // comas colgantes antes de } o ]
      .replace(/,(\s*[}\]])/g, '$1');

    try {
      return JSON.parse(normalized);
    } catch (err) {
      console.warn(
        `[DynamicContentComponent] JSON inválido en el bloque de componente: ${(err as Error).message}`,
        jsonBody
      );
      return null;
    }
  }
}
