import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, of } from 'rxjs';
import { PostViewModel } from '../models/post-view.model';
import { WpGraphqlResponse, WpGraphqlPostNode } from '../models/wp-post.dto';
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
        posts(where: {name: $slug}) {
          nodes {
            id
            title
            content
            excerpt
            date
            uri
            postId
            modified
            contentauthormodel {
              autorDelPost
              introduction
              fieldGroupName
              avatar {
                node {
                  sourceUrl
                  uri
                }
              }
              linkAAutor {
                url
                title
                target
              }
              additionalparagraphs {
                fieldGroupName
                paragraphsmore
              }
            }
            categories {
              nodes {
                name
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
        map(response => response.data?.posts?.nodes?.[0] ?? null),
        map(post => (post ? this.toViewModel(post) : null))
      );
  }

  private toViewModel(post: WpGraphqlPostNode): PostViewModel {
    const authorModel = post.contentauthormodel;
    const categoryName = post.categories?.nodes?.[0]?.name ?? '';

    return {
      id: String(post.postId ?? post.id),
      slug: post.uri?.replace(/^\/|\/$/g, '').split('/').pop() ?? '',
      titulo: this.stripRenderedToText(post.title ?? ''),
      contenidoHtml: post.content ?? '',
      resumenHtml: post.excerpt ?? '',
      fechaPublicacion: post.date,
      fechaModificacion: post.modified,
      nombreAutor: authorModel?.autorDelPost ?? '',
      categoria: categoryName,
      contentAuthor: {
        name: authorModel?.autorDelPost ?? '',
        srcAvatar: authorModel?.avatar?.node?.sourceUrl ?? '',
        linkRefenceAuthor: authorModel?.linkAAutor?.url ?? '',
        introduction: authorModel?.introduction ?? '',
        additionalParagraphs: Array.isArray(authorModel?.additionalparagraphs) 
          ? authorModel.additionalparagraphs.map(p => p?.paragraphsmore ?? '') 
          : []
      }
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
