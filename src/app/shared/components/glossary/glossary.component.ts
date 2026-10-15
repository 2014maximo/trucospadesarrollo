import {
  ChangeDetectionStrategy, Component, Injector, PLATFORM_ID, afterNextRender, computed, effect, inject, input,
  signal, untracked
} from '@angular/core';
import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { normalizar } from '../../constants/functions/text-search';
import { TerminoVista, TextoVista } from '../../models/glossary-view.model';
import { GlossaryModel, GlossaryTermModel, GlossaryText } from '../../models/glossary.model';
import { ImageAdapterModel } from '../../models/image-adapter.model';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { ImageAdapterComponent } from '../image-adapter/image-adapter.component';
import { PaginatorComponent } from '../paginator/paginator.component';

const PREFIJO_ANCLA = 'glosario-';

function textoDe(valor: GlossaryText | undefined): string {
  return (typeof valor === 'string' ? valor : valor?.text ?? '').trim();
}

/** `styleText`, si viene, sustituye por completo a las clases por defecto. */
function aVista(valor: GlossaryText | undefined, clasePorDefecto: string): TextoVista {
  const modelo = typeof valor === 'string' ? undefined : valor;
  return {
    text: textoDe(valor),
    clase: modelo?.styleText?.trim() || clasePorDefecto.trim(),
    url: modelo?.url?.trim() ?? '',
    target: modelo?.target || '_blank'
  };
}

function slug(texto: string): string {
  return normalizar(texto).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

@Component({
  selector: 'app-glossary',
  imports: [
    TranslateModule, RouterLink, NgTemplateOutlet, HighlightPipe, ImageAdapterComponent, PaginatorComponent
  ],
  templateUrl: './glossary.component.html',
  styleUrl: './glossary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlossaryComponent {

  /** JSON del post: `{ "type": "glossary", "data": GlossaryModel }`. */
  public glossary = input<GlossaryModel>(new GlossaryModel());

  public busqueda = signal<string>('');
  /** Letra activa del índice A–Z; `null` muestra todas. */
  public letra = signal<string | null>(null);
  private pagina = signal<TerminoVista[]>([]);
  private anclaPendiente = signal<string | null>(null);

  private readonly injector = inject(Injector);
  private readonly esNavegador = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly fragmento = toSignal(inject(ActivatedRoute).fragment, { initialValue: null });

  public color = computed(() => this.glossary()?.color?.trim() ?? '');

  public encabezado = computed<TextoVista>(() => {
    const vista = aVista(this.glossary()?.title, `text-center f-bebas fs-50 fw-6 ${this.color()}`);
    return { ...vista, text: vista.text || 'Glosario' };
  });

  private terminos = computed<TerminoVista[]>(() => {
    const anclas = new Map<string, number>();
    const color = this.color();

    return (this.glossary()?.terms ?? [])
      .filter((termino: GlossaryTermModel) => !!textoDe(termino?.title))
      .sort((a, b) => textoDe(a.title).localeCompare(textoDe(b.title), 'es', { sensitivity: 'base' }))
      .map((termino: GlossaryTermModel) => {
        const titulo = aVista(termino.title, `f-shadow-into-l ${color} fs-35 lh-25 p-0 m-0`);
        const base = PREFIJO_ANCLA + (slug(termino.id || titulo.text) || 'termino');
        const repeticiones = (anclas.get(base) ?? 0) + 1;
        anclas.set(base, repeticiones);
        const inicial = normalizar(titulo.text).charAt(0).toUpperCase();

        const vista: Omit<TerminoVista, 'texto'> = {
          titulo,
          categoria: textoDe(termino.category) ? aVista(termino.category, 'f-shadow-into-l fs-25 c1 m-0') : null,
          fecha: textoDe(termino.updatedAt) ? aVista(termino.updatedAt, 'f-shadow-into-l c7 fs-12 m-0') : null,
          parrafos: (termino.paragraphs ?? []).map(p => aVista(p, 'glossary-text f-open-sans-c fs-20')),
          secciones: (termino.sections ?? []).map(seccion => ({
            titulos: (seccion.titles ?? []).map(t => aVista(t, 'glossary-text f-open-sans-c fs-20 fw-bold m-0')),
            elementos: (seccion.items ?? []).map(e => aVista(e, 'glossary-text f-open-sans-c fs-20 m-0 ps-3'))
          })),
          links: (termino.links ?? []).filter(link => !!link?.url),
          ancla: repeticiones > 1 ? `${base}-${repeticiones}` : base,
          letra: /[A-Z]/.test(inicial) ? inicial : '#',
          imagen: termino.image?.src ? Object.assign(new ImageAdapterModel(), termino.image) : null
        };
        return { ...vista, texto: this.textoBuscable(vista) };
      });
  });

  public hayTerminos = computed(() => this.terminos().length > 0);

  public letras = computed<string[]>(() => [...new Set(this.terminos().map(({ letra }) => letra))].sort());

  public filtrados = computed<TerminoVista[]>(() => {
    const consulta = normalizar(this.busqueda().trim());
    const letra = this.letra();
    return this.terminos().filter(item =>
      (!letra || item.letra === letra) && (!consulta || item.texto.includes(consulta)));
  });

  /** El paginador no emite con el contenedor vacío, así que se vacía aquí la vista. */
  public visibles = computed<TerminoVista[]>(() => this.filtrados().length ? this.pagina() : []);

  constructor() {
    // Enlace directo (#glosario-...): se busca el término para traerlo a la vista aunque esté en otra página.
    effect(() => {
      const fragmento = this.fragmento();
      const destino = fragmento ? this.terminos().find(({ ancla }) => ancla === fragmento) : undefined;
      if (!destino) {
        return;
      }
      untracked(() => {
        this.letra.set(null);
        this.busqueda.set(destino.titulo.text);
        this.anclaPendiente.set(destino.ancla);
      });
    });

    effect(() => {
      const ancla = this.anclaPendiente();
      if (!ancla || !this.visibles().some(item => item.ancla === ancla)) {
        return;
      }
      untracked(() => this.anclaPendiente.set(null));
      if (this.esNavegador) {
        afterNextRender(
          () => document.getElementById(ancla)?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
          { injector: this.injector }
        );
      }
    });
  }

  public buscar(e: Event): void {
    this.busqueda.set((e.target as HTMLInputElement).value);
  }

  /** Vacía el buscador para volver a mostrar todos los términos y deja el foco listo para otra palabra. */
  public limpiarBusqueda(buscador: HTMLInputElement): void {
    this.busqueda.set('');
    buscador.focus();
  }

  public seleccionarLetra(letra: string | null): void {
    this.letra.set(letra === this.letra() ? null : letra);
  }

  public recibirPagina(terminos: TerminoVista[]): void {
    this.pagina.set(terminos);
  }

  public esExterno(url: string): boolean {
    return /^https?:\/\//i.test(url);
  }

  private textoBuscable(vista: Omit<TerminoVista, 'texto'>): string {
    const partes: string[] = [
      vista.titulo.text,
      vista.categoria?.text ?? '',
      ...vista.parrafos.map(({ text }) => text),
      ...vista.secciones.flatMap(seccion => [...seccion.titulos, ...seccion.elementos].map(({ text }) => text))
    ];
    return normalizar(partes.filter(Boolean).join(' '));
  }
}
