import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BlogContentService } from 'src/app/features/blog/services/blog-content.service';
import { PostViewModel } from 'src/app/features/blog/models/post-view.model';

interface SlideItem {
  imagenUrl: string;
  titulo: string;
  ruta: string;
  categoria: string;
  alt: string;
}

export type SliderEstado = 'oculto' | 'cargando' | 'error' | 'listo' | 'vacio';

@Component({
  selector: 'app-slider-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider-home.component.html',
  styleUrl: './slider-home.component.css'
})
export class SliderHomeComponent implements OnInit {

  estado: SliderEstado = 'cargando';
  slides: SlideItem[] = [];

  constructor(
    private readonly router: Router,
    private readonly blogContent: BlogContentService
  ) { }

  ngOnInit(): void {
    if (!this.blogContent.hasBaseUrl()) {
      this.estado = 'oculto';
      return;
    }

    this.blogContent.getLatestPosts(10).subscribe({
      next: posts => {
        this.slides = posts
          .filter(p => (p.imagenDestacada ?? '').trim().length > 0)
          .map(p => this.toSlideItem(p));

        this.estado = this.slides.length > 0 ? 'listo' : 'vacio';
      },
      error: err => {
        console.error('[SliderHome] Error al obtener posts:', err);
        this.estado = 'error';
      }
    });
  }

  private toSlideItem(post: PostViewModel): SlideItem {
    const categoriaSlug = post.categoriaNombre?.toLowerCase() || 'sin-categoria';
    return {
      imagenUrl: post.imagenDestacada ?? '',
      titulo: post.titulo,
      ruta: `/blog/${categoriaSlug}/${post.slug}`,
      categoria: post.categoriaNombre,
      alt: post.titulo
    };
  }

  irAlPost(ruta: string): void {
    this.router.navigate([ruta]);
  }

}
