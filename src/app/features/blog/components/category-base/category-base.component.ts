import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { DynamicContentComponent } from 'src/app/shared/components/dynamic-content/dynamic-content.component';
import { ContentIndexComponent } from 'src/app/shared/components/content-index/content-index.component';
import { IndiceDeContenidosModel } from 'src/app/shared/models/indice.model';
import { CategoryViewModel } from '../../models/category-view.model';
import { PostViewModel } from '../../models/post-view.model';
import { BlogContentService } from '../../services/blog-content.service';
import { CATEGORIES } from 'src/app/shared/components/categories/constants/categories.constant';
import { CategoriesPageModel } from 'src/app/shared/models/categories-page.model';

export type CategoryBaseEstado = 'cargando' | 'listo' | 'no-encontrado' | 'error' | 'sin-api';

/**
 * Componente genérico para páginas de categoría obtenidas desde
 * WordPress Headless (GraphQL query `pages`).
 *
 * URL esperada: /blog/:categoria  (p.ej. /blog/developer)
 *
 * Si la API no está configurada muestra un mensaje estático usando los datos
 * locales de `CATEGORIES` como fallback, de modo que la página siempre tenga
 * contenido básico incluso sin conectividad al CMS.
 */
@Component({
  selector: 'app-category-base',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent, FooterComponent, DynamicContentComponent, ContentIndexComponent],
  templateUrl: './category-base.component.html',
  styleUrl: './category-base.component.css'
})
export class CategoryBaseComponent implements OnInit {
  /** Fondos de categoría muy claros: sobre ellos el texto debe ser oscuro. */
  private static readonly FONDOS_CLAROS = new Set([
    'bg-Electron',
    'bg-React',
    'bg-Javascript',
    'bg-Sql',
    'bg-Db',
    'bg-Developer'
  ]);

  estado: CategoryBaseEstado = 'cargando';
  categoria: CategoryViewModel | null = null;
  categoriaLocal?: CategoriesPageModel;
  indice: IndiceDeContenidosModel[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogContent: BlogContentService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('categoria') ?? '';

    // Cargar datos locales como referencia (ícono, color, etc.)
    this.categoriaLocal = CATEGORIES.find(
      c => c.nameCategorie.toLowerCase() === slug.toLowerCase()
    );

    if (!slug.trim()) {
      this.estado = 'no-encontrado';
      return;
    }

    if (!this.blogContent.hasBaseUrl()) {
      // Sin API: usar datos estáticos para mostrar una página básica
      this.estado = 'sin-api';
      return;
    }

    this.blogContent.getCategoryBySlug(slug).subscribe({
      next: pagina => {
        if (!pagina) {
          this.estado = 'no-encontrado';
          this.categoria = null;
          return;
        }
        this.categoria = pagina;
        this.estado = 'listo';
        this.cargarIndicePosts(slug);
      },
      error: () => {
        this.estado = 'error';
        this.categoria = null;
      }
    });
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView();
  }

  /**
   * Construye el índice de contenidos a partir de los posts de la categoría
   * obtenidos desde WordPress. El link se arma con el prefijo de enrutamiento
   * de la app (`/blog/{categoria}/`) más el slug del post (último segmento del
   * `uri` de WP), produciendo rutas absolutas como
   * "/blog/angular/instalacion-de-angular-y-recomendaciones".
   */
  private cargarIndicePosts(categoria: string): void {
    this.blogContent.getPostsByCategory(categoria).subscribe({
      next: posts => {
        this.indice = posts.map((post: PostViewModel) => ({
          color: this.colorTexto(this.categoriaLocal?.colorFondo),
          colorFondo: this.categoriaLocal?.colorFondo ?? '',
          estado: 'activo',
          nombre: post.titulo,
          posicion: '',
          ruta: post.slug ? `/blog/${categoria}/${post.slug}` : '',
          rutaInterna: ''
        }));
      },
      error: () => {
        this.indice = [];
      }
    });
  }

  /**
   * Decide el color de texto del índice según el fondo de la categoría:
   * blanco para fondos oscuros/medios, oscuro para fondos muy claros, y
   * herencia (cadena vacía) cuando no hay fondo local definido.
   */
  private colorTexto(colorFondo?: string): string {
    if (!colorFondo) {
      return '';
    }
    return CategoryBaseComponent.FONDOS_CLAROS.has(colorFondo) ? 'text-dark' : 'text-white';
  }
}
