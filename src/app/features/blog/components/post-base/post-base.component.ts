import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { DynamicContentComponent } from 'src/app/shared/components/dynamic-content/dynamic-content.component';
import { HeaderPostSupplementComponent } from 'src/app/shared/components/header-post-supplement/header-post-supplement.component';
import { PostViewModel } from '../../models/post-view.model';
import { BlogContentService } from '../../services/blog-content.service';
import { CATEGORIA } from '../../constants/categories.constant';
import { CategoriaPostModel } from '../../models/categorias.model';

export type PostBaseEstado = 'cargando' | 'listo' | 'no-encontrado' | 'error' | 'sin-api';

@Component({
  selector: 'app-post-base',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent, FooterComponent, DynamicContentComponent, HeaderPostSupplementComponent],
  templateUrl: './post-base.component.html',
  styleUrl: './post-base.component.css'
})
export class PostBaseComponent implements OnInit {
  estado: PostBaseEstado = 'cargando';
  post: PostViewModel | null = null;
  categoriaData?: CategoriaPostModel;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogContent: BlogContentService,
  ) { }

  ngOnInit(): void {
    console.log('[PostBase] ngOnInit — URL completa:', window?.location?.href ?? 'N/A');

    if (!this.blogContent.hasBaseUrl()) {
      console.warn('[PostBase] Sin URL de API configurada → estado: sin-api');
      this.estado = 'sin-api';
      return;
    }

    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const categoria = this.route.snapshot.paramMap.get('categoria') ?? '';
    console.log('[PostBase] Parámetros de ruta → categoria:', categoria, '| slug:', slug);

    if (!slug.trim()) {
      console.warn('[PostBase] Slug vacío → estado: no-encontrado');
      this.estado = 'no-encontrado';
      return;
    }

    this.blogContent.getPostBySlug(slug).subscribe({
      next: publicacion => {
        if (!publicacion) {
          console.warn('[PostBase] La API devolvió null para slug:', slug, '→ estado: no-encontrado');
          this.estado = 'no-encontrado';
          this.post = null;
          return;
        }
        console.log('[PostBase] Post cargado OK:', publicacion);
        this.post = publicacion;
        this.categoriaData = CATEGORIA.find(
          c => c.nombre.toLowerCase() === publicacion.categoriaNombre?.toLowerCase()
        );
        console.log('[PostBase] Categoría local encontrada:', this.categoriaData?.nombre ?? 'ninguna (usará fallback PNG)');
        this.estado = 'listo';
      },
      error: (err) => {
        console.error('[PostBase] Error al llamar la API:', err);
        this.estado = 'error';
        this.post = null;
      }
    });
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView();
  }

  /** Ruta al PNG del ícono de la categoría (assets locales como fallback) */
  get rutaIconoCategoria(): string {
    if (this.categoriaData?.rutaIcono) {
      return this.categoriaData.rutaIcono;
    }
    const nombre = this.post?.categoriaNombre?.toLowerCase() ?? '';
    return nombre ? `assets/img/categorias/${nombre}.png` : '';
  }

  /**
   * Extrae cada párrafo del extracto HTML de WordPress como texto limpio.
   * Toma el contenido de cada <p>...</p> y elimina cualquier etiqueta HTML interna.
   * SSR-safe: usa regex, no requiere DOM.
   */
  get extractoParrafos(): string[] {
    const html = this.post?.resumenHtml ?? '';
    if (!html.trim()) return [];

    // Extrae el contenido entre etiquetas <p>
    const parrafos = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) ?? [];

    if (parrafos.length > 0) {
      return parrafos
        .map(p => p.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
        .filter(t => t.length > 0);
    }

    // Fallback: si no hay <p>, limpia todo el HTML y devuelve como párrafo único
    return [html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()].filter(t => t.length > 0);
  }
}
