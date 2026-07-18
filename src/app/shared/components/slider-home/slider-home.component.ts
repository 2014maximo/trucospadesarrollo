import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
export class SliderHomeComponent implements OnInit, AfterViewInit {

  @ViewChild('carousel') carouselRef!: ElementRef;

  estado: SliderEstado = 'cargando';
  slides: SlideItem[] = [];
  slideActivo = 0;

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

  ngAfterViewInit(): void {
    if (this.carouselRef?.nativeElement) {
      this.carouselRef.nativeElement.addEventListener('slid.bs.carousel', (event: any) => {
        this.slideActivo = event.to;
      });
    }
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

  get slideActual(): SlideItem {
    return this.slides[this.slideActivo] || this.slides[0];
  }

  irAlPost(ruta: string): void {
    this.router.navigate([ruta]);
  }

}
