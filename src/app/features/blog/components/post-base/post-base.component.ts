import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { PostViewModel } from '../../models/post-view.model';
import { BlogContentService } from '../../services/blog-content.service';
import { ContentAuthorComponent } from 'src/app/shared/components/content-author/content-author.component';
import { CATEGORIA } from '../../constants/categories.constant';
import { CategoriaPostModel } from '../../models/categorias.model';

export type PostBaseEstado = 'cargando' | 'listo' | 'no-encontrado' | 'error' | 'sin-api';

@Component({
  selector: 'app-post-base',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent, FooterComponent, ContentAuthorComponent],
  templateUrl: './post-base.component.html',
  styleUrl: './post-base.component.css'
})
export class PostBaseComponent implements OnInit {
  estado: PostBaseEstado = 'cargando';
  post: PostViewModel | null = null;
  contenidoSeguro: SafeHtml | null = null;
  resumenSeguro: SafeHtml | null = null;
  parrafosAdicionalesSeguros: SafeHtml[] = [];
  categoriaData?: CategoriaPostModel;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogContent: BlogContentService,
    private readonly sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    if (!this.blogContent.hasBaseUrl()) {
      this.estado = 'sin-api';
      return;
    }

    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    if (!slug.trim()) {
      this.estado = 'no-encontrado';
      return;
    }

    this.blogContent.getPostBySlug(slug).subscribe({
      next: publicacion => {
        if (!publicacion) {
          this.estado = 'no-encontrado';
          this.post = null;
          this.contenidoSeguro = null;
          this.resumenSeguro = null;
          return;
        }
        this.post = publicacion;
        this.categoriaData = CATEGORIA.find(c => c.nombre.toLowerCase() === publicacion.categoria?.toLowerCase());
        this.contenidoSeguro = this.sanitizer.bypassSecurityTrustHtml(publicacion.contenidoHtml);
        this.resumenSeguro = publicacion.contentAuthor?.introduction?.trim()
          ? this.sanitizer.bypassSecurityTrustHtml(publicacion.contentAuthor.introduction)
          : null;
        this.parrafosAdicionalesSeguros = (publicacion.contentAuthor?.additionalParagraphs || [])
          .filter(p => typeof p === 'string' && p.trim().length > 0)
          .map(p => this.sanitizer.bypassSecurityTrustHtml(p));
        this.estado = 'listo';
      },
      error: () => {
        this.estado = 'error';
        this.post = null;
        this.contenidoSeguro = null;
        this.resumenSeguro = null;
      }
    });
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView();
  }
}
