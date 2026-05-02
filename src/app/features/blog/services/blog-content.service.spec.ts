import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BLOG_WP_GRAPHQL_URL_TOKEN } from '../tokens/blog-wp-graphql-url.token';
import { BlogContentService } from './blog-content.service';

describe('BlogContentService', () => {
  describe('con API configurada', () => {
    let service: BlogContentService;
    let httpMock: HttpTestingController;
    let translate: TranslateService;
    const apiBase = 'http://localhost/wordpress/graphql';

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, TranslateModule.forRoot()],
        providers: [
          BlogContentService,
          { provide: BLOG_WP_GRAPHQL_URL_TOKEN, useValue: apiBase }
        ]
      });
      service = TestBed.inject(BlogContentService);
      httpMock = TestBed.inject(HttpTestingController);
      translate = TestBed.inject(TranslateService);
      translate.use('es');
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('debe crearse', () => {
      expect(service).toBeTruthy();
      expect(service.hasBaseUrl()).toBeTrue();
    });

    it('no debe llamar al HTTP si el slug está vacío', done => {
      service.getPostBySlug('  ').subscribe(res => {
        expect(res).toBeNull();
        done();
      });
    });

    it('debe solicitar a GraphQL con query', () => {
      service.getPostBySlug('mi-articulo').subscribe();

      const req = httpMock.expectOne(r =>
        r.url.startsWith(apiBase) && r.method === 'POST'
      );
      
      expect(req.request.body.variables.slug).toBe('mi-articulo');
      req.flush({ data: { posts: { nodes: [] } } });
    });

    it('debe mapear el primer resultado a PostViewModel', () => {
      let resultado: any;
      service.getPostBySlug('hola').subscribe(p => (resultado = p));

      const req = httpMock.expectOne(r =>
        r.url.startsWith(apiBase) && r.method === 'POST'
      );
      req.flush({
        data: {
          posts: {
            nodes: [
              {
                id: '42',
                postId: 42,
                uri: '/hola/',
                date: '2026-01-01T00:00:00',
                modified: '2026-01-02T00:00:00',
                title: 'Título',
                content: '<p>Cuerpo</p>',
                excerpt: '<p>Resumen</p>',
                contentauthormodel: {
                  autorDelPost: 'Alex',
                  introduction: 'Intro',
                  avatar: { node: { filePath: '/avatar.png' } },
                  linkAAutor: { url: 'http://link', title: 'Alex', target: '_blank' }
                },
                categories: {
                  nodes: [{ name: 'Desarrollo' }]
                }
              }
            ]
          }
        }
      });

      expect(resultado).toEqual(
        jasmine.objectContaining({
          id: '42',
          slug: 'hola',
          titulo: 'Título',
          contenidoHtml: '<p>Cuerpo</p>',
          resumenHtml: '<p>Resumen</p>',
          nombreAutor: 'Alex',
          categoria: 'Desarrollo'
        })
      );
    });
  });

  describe('sin API configurada (URL vacía)', () => {
    it('hasBaseUrl debe ser false', () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, TranslateModule.forRoot()],
        providers: [
          BlogContentService,
          { provide: BLOG_WP_GRAPHQL_URL_TOKEN, useValue: '   ' }
        ]
      });
      const svc = TestBed.inject(BlogContentService);
      expect(svc.hasBaseUrl()).toBeFalse();
    });
  });
});
