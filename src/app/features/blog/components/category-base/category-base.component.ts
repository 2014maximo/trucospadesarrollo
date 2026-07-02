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
import { CategoriaPostModel, DatosPost } from '../../models/categorias.model';
import { BlogContentService } from '../../services/blog-content.service';
import { CATEGORIA } from '../../constants/categories.constant';

export type CategoryBaseEstado = 'cargando' | 'listo' | 'no-encontrado' | 'error' | 'sin-api';

/**
 * Componente genérico para páginas de categoría obtenidas desde
 * WordPress Headless (GraphQL query `pages`).
 *
 * URL esperada: /blog/:categoria  (p.ej. /blog/developer)
 *
 * Si la API no está configurada muestra un mensaje estático usando los datos
 * locales de `CATEGORIA` como fallback, de modo que la página siempre tenga
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
  estado: CategoryBaseEstado = 'cargando';
  categoria: CategoryViewModel | null = null;
  categoriaLocal?: CategoriaPostModel;
  indice: IndiceDeContenidosModel[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogContent: BlogContentService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('categoria') ?? '';

    // Cargar datos locales como referencia (ícono, color, lista de posts, etc.)
    this.categoriaLocal = CATEGORIA.find(
      c => c.nombre.toLowerCase() === slug.toLowerCase()
    );

    // Construir índice de contenidos a partir de los posts locales de la categoría
    this.indice = [];
    if (this.categoriaLocal) {
      this.categoriaLocal.post.forEach((post: DatosPost) => {
        this.indice.push({
          color: '',
          colorFondo: post.estilos.colorFondo,
          estado: post.estado,
          nombre: post.nombre,
          posicion: post.posicion,
          ruta: post.ruta,
          rutaInterna: ''
        });
      });
    }

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
}
