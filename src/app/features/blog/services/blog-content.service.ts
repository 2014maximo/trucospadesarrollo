import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, of } from 'rxjs';
import { PostViewModel } from '../models/post-view.model';
import { CategoryViewModel } from '../models/category-view.model';
import { WpGraphqlResponse, WpGraphqlPostNode, WpGraphqlPagesResponse, WpGraphqlPageNode } from '../models/wp-post.dto';
import { BLOG_WP_GRAPHQL_URL_TOKEN } from '../tokens/blog-wp-graphql-url.token';

@Injectable({
  providedIn: 'root'
})
export class BlogContentService {
  constructor(
    private readonly http: HttpClient,
    @Inject(BLOG_WP_GRAPHQL_URL_TOKEN) private readonly apiBase: string,
    private translate: TranslateService
  ) { }

  hasBaseUrl(): boolean {
    return this.apiBase.trim().length > 0;
  }

  /**
   * Obtiene un post por slug desde WordPress usando GraphQL.
   * Emite `null` si no hay resultados o el slug está vacío.
   */
  getPostBySlug(slug: string): Observable<PostViewModel | null> {
    const trimmed = slug?.trim() ?? '';
    if (!trimmed || !this.hasBaseUrl()) {
      return of(null);
    }

    const currentLang = this.translate.currentLang || 'es';
    const apiUrlWithLang = `${this.apiBase}?lang=${currentLang}`;

    const query = `
      query GetPost($slug: String!) {
        posts(where: { name: $slug }) {
          nodes {
            id
            title
            content
            excerpt
            date
            modified
            uri
            authorId
            categories {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    `;

    return this.http
      .post<WpGraphqlResponse>(apiUrlWithLang, {
        query,
        variables: { slug: trimmed }
      })
      .pipe(
        map(response => {
          console.log('[BlogContentService] getPostBySlug — respuesta raw de la API:', response);
          return response.data?.posts?.nodes?.[0] ?? null;
        }),
        map(post => (post ? this.toViewModel(post) : null))
      );
  }

  private toViewModel(post: WpGraphqlPostNode): PostViewModel {
    const categoryEdgeNode = post.categories?.edges?.[0]?.node;
    const categoryId = categoryEdgeNode?.id ?? '';
    const categoryName = categoryEdgeNode?.name ?? '';

    return {
      id: post.id,
      slug: post.uri?.replace(/^\/|\/$/g, '').split('/').pop() ?? '',
      titulo: this.stripHtmlToText(post.title ?? ''),
      contenidoHtml: post.content ?? '',
      resumenHtml: post.excerpt ?? '',
      fechaPublicacion: post.date,
      fechaModificacion: post.modified,
      categoria: categoryId,
      categoriaNombre: categoryName,
    };
  }

  private stripHtmlToText(html: string): string {
    if (!html) return '';
    // SSR-safe: usa regex si no hay DOM disponible
    if (typeof document === 'undefined') {
      return html.replace(/<[^>]+>/g, '').trim();
    }
    const el = document.createElement('div');
    el.innerHTML = html;
    return (el.textContent ?? el.innerText ?? '').trim();
  }

  // ── Categorías headless (pages) ───────────────────────────────────────────

  /**
   * Obtiene el contenido de una categoría desde WordPress usando la query de
   * páginas (`pages`) filtrada por slug.
   * Emite `null` si no hay resultados o el slug está vacío.
   */
  getCategoryBySlug(slug: string): Observable<CategoryViewModel | null> {
    const trimmed = slug?.trim() ?? '';
    if (!trimmed || !this.hasBaseUrl()) {
      return of(null);
    }

    const currentLang = this.translate.currentLang || 'es';
    const apiUrlWithLang = `${this.apiBase}?lang=${currentLang}`;

    const query = `
      query GetCategory($slug: String!) {
        pages(where: { name: $slug }) {
          edges {
            node {
              id
              title
              content
              slug
              uri
            }
          }
        }
      }
    `;

    return this.http
      .post<WpGraphqlPagesResponse>(apiUrlWithLang, {
        query,
        variables: { slug: trimmed }
      })
      .pipe(
        map(response => {
          console.log('[BlogContentService] getCategoryBySlug — respuesta raw de la API:', response);
          return response.data?.pages?.edges?.[0]?.node ?? null;
        }),
        map(page => (page ? this.toPageViewModel(page) : null))
      );
  }

  private toPageViewModel(page: WpGraphqlPageNode): CategoryViewModel {
    return {
      id: page.id,
      slug: page.slug ?? page.uri?.replace(/^\/|\/$/g, '').split('/').pop() ?? '',
      titulo: this.stripHtmlToText(page.title ?? ''),
      contenidoHtml: page.content ?? ''
    };
  }
}
