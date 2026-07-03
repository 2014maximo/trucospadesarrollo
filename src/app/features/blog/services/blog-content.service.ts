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
            featuredImage {
              node {
                sourceUrl
              }
            }
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

  /**
   * Obtiene los últimos `count` posts desde WordPress, ordenados por fecha descendente.
   * Emite array vacío si no hay URL base configurada.
   */
  getLatestPosts(count: number = 10): Observable<PostViewModel[]> {
    if (!this.hasBaseUrl()) {
      return of([]);
    }

    const currentLang = this.translate.currentLang || 'es';
    const apiUrlWithLang = `${this.apiBase}?lang=${currentLang}`;

    const query = `
      query GetLatestPosts($count: Int!) {
        posts(first: $count, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            title
            uri
            date
            modified
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
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
        variables: { count }
      })
      .pipe(
        map(response => {
          const nodes = response.data?.posts?.nodes ?? [];
          return nodes.map(post => this.toViewModel(post));
        })
      );
  }

  private toViewModel(post: WpGraphqlPostNode): PostViewModel {
    const categoryEdgeNode = post.categories?.edges?.[0]?.node;
    const categoryId = categoryEdgeNode?.id ?? '';
    const categoryName = categoryEdgeNode?.name ?? '';

    return {
      id: post.id,
      slug: post.uri?.replace(/^\/|\/$/g, '').split('/').pop() ?? '',
      uri: post.uri ?? '',
      titulo: this.stripHtmlToText(post.title ?? ''),
      contenidoHtml: post.content ?? '',
      resumenHtml: post.excerpt ?? '',
      fechaPublicacion: post.date,
      fechaModificacion: post.modified,
      categoria: categoryId,
      categoriaNombre: categoryName,
      imagenDestacada: post.featuredImage?.node?.sourceUrl ?? '',
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

  /**
   * Busca posts por término desde WordPress usando GraphQL search.
   * Emite array vacío si no hay término o URL base configurada.
   */
  searchPosts(query: string, count: number = 8): Observable<PostViewModel[]> {
    const trimmed = query?.trim() ?? '';
    if (!trimmed || !this.hasBaseUrl()) {
      return of([]);
    }

    const currentLang = this.translate.currentLang || 'es';
    const apiUrlWithLang = `${this.apiBase}?lang=${currentLang}`;

    const graphqlQuery = `
      query SearchPosts($search: String!, $count: Int!) {
        posts(first: $count, where: { search: $search }) {
          nodes {
            id
            title
            uri
            date
            modified
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
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
        query: graphqlQuery,
        variables: { search: trimmed, count }
      })
      .pipe(
        map(response => {
          const nodes = response.data?.posts?.nodes ?? [];
          return nodes.map(post => this.toViewModel(post));
        })
      );
  }

  // ── Categorías headless (pages) ───────────────────────────────────────────

  /**
   * Obtiene los posts de una categoría desde WordPress usando GraphQL
   * (filtrado por `categoryName`). Emite array vacío si no hay URL base
   * configurada o la categoría está vacía.
   */
  getPostsByCategory(categoria: string): Observable<PostViewModel[]> {
    const trimmed = categoria?.trim() ?? '';
    if (!trimmed || !this.hasBaseUrl()) {
      return of([]);
    }

    const currentLang = this.translate.currentLang || 'es';
    const apiUrlWithLang = `${this.apiBase}?lang=${currentLang}`;

    const query = `
      query GetPostsByCategory($categoryName: String!) {
        posts(where: { categoryName: $categoryName }) {
          nodes {
            id
            title
            uri
            excerpt
            date
            modified
            featuredImage {
              node {
                sourceUrl
              }
            }
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
        variables: { categoryName: trimmed }
      })
      .pipe(
        map(response => {
          const nodes = response.data?.posts?.nodes ?? [];
          return nodes.map(post => this.toViewModel(post));
        })
      );
  }

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
