import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BLOG_WP_REST_URL } from '../tokens/blog-wp-rest-url.token';
import { BlogContentService } from './blog-content.service';

describe('BlogContentService', () => {
  describe('con API configurada', () => {
    let service: BlogContentService;
    let httpMock: HttpTestingController;
    const apiBase = 'https://ejemplo.test/wp-json/wp/v2';

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          BlogContentService,
          { provide: BLOG_WP_REST_URL, useValue: apiBase }
        ]
      });
      service = TestBed.inject(BlogContentService);
      httpMock = TestBed.inject(HttpTestingController);
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

    it('debe solicitar /posts con slug y _embed', () => {
      service.getPostBySlug('mi-articulo').subscribe();

      const req = httpMock.expectOne(r =>
        r.url === `${apiBase}/posts` &&
        r.params.get('slug') === 'mi-articulo' &&
        r.params.get('_embed') === '1'
      );
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('debe mapear el primer resultado a PostViewModel', () => {
      let resultado: unknown;
      service.getPostBySlug('hola').subscribe(p => (resultado = p));

      const req = httpMock.expectOne(r =>
        r.url.startsWith(`${apiBase}/posts`) &&
        r.params.get('slug') === 'hola' &&
        r.params.get('_embed') === '1'
      );
      req.flush([
        {
          id: 42,
          slug: 'hola',
          date: '2026-01-01T00:00:00',
          modified: '2026-01-02T00:00:00',
          title: { rendered: 'T&iacute;tulo' },
          content: { rendered: '<p>Cuerpo</p>' },
          excerpt: { rendered: '<p>Resumen</p>' },
          _embedded: { author: [{ name: 'Alex' }] }
        }
      ]);

      expect(resultado).toEqual(
        jasmine.objectContaining({
          id: '42',
          slug: 'hola',
          titulo: 'Título',
          contenidoHtml: '<p>Cuerpo</p>',
          resumenHtml: '<p>Resumen</p>',
          nombreAutor: 'Alex'
        })
      );
    });
  });

  describe('sin API configurada (URL vacía)', () => {
    it('hasBaseUrl debe ser false', () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          BlogContentService,
          { provide: BLOG_WP_REST_URL, useValue: '   ' }
        ]
      });
      const svc = TestBed.inject(BlogContentService);
      expect(svc.hasBaseUrl()).toBeFalse();
    });
  });
});
