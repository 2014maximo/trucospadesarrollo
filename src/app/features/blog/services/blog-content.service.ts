import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { PostViewModel } from '../models/post-view.model';
import { WpPostDto } from '../models/wp-post.dto';
import { BLOG_WP_REST_URL } from '../tokens/blog-wp-rest-url.token';

@Injectable({
  providedIn: 'root'
})
export class BlogContentService {
  constructor(
    private readonly http: HttpClient,
    @Inject(BLOG_WP_REST_URL) private readonly apiBase: string
  ) {}

  hasBaseUrl(): boolean {
    return this.apiBase.trim().length > 0;
  }

  /**
   * Obtiene un post por slug desde WordPress (`GET /posts?slug=...&_embed=1`).
   * Emite `null` si no hay resultados o el slug está vacío.
   */
  getPostBySlug(slug: string): Observable<PostViewModel | null> {
    const trimmed = slug?.trim() ?? '';
    if (!trimmed || !this.hasBaseUrl()) {
      return of(null);
    }

    const params = new HttpParams()
      .set('slug', trimmed)
      .set('_embed', '1');

    return this.http
      .get<WpPostDto[]>(`${this.apiBase}/posts`, { params })
      .pipe(
        map(lista => lista[0] ?? null),
        map(post => (post ? this.toViewModel(post) : null))
      );
  }

  private toViewModel(post: WpPostDto): PostViewModel {
    return {
      id: String(post.id),
      slug: post.slug,
      titulo: this.stripRenderedToText(post.title?.rendered ?? ''),
      contenidoHtml: post.content?.rendered ?? '',
      resumenHtml: post.excerpt?.rendered ?? '',
      fechaPublicacion: post.date,
      fechaModificacion: post.modified,
      nombreAutor: post._embedded?.author?.[0]?.name ?? ''
    };
  }

  private stripRenderedToText(html: string): string {
    if (!html) {
      return '';
    }
    if (typeof document === 'undefined') {
      return html.replace(/<[^>]+>/g, '').trim();
    }
    const el = document.createElement('div');
    el.innerHTML = html;
    return (el.textContent ?? el.innerText ?? '').trim();
  }
}
