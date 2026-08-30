import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { PostViewModel } from '../../models/post-view.model';
import { BlogContentService } from '../../services/blog-content.service';
import { PostBaseComponent } from './post-base.component';
import { ContentAuthorModel } from 'src/app/shared/models/content-author.model';

function autorMock(): ContentAuthorModel {
  const autor = new ContentAuthorModel();
  autor.name = 'Alex';
  autor.srcAvatar = 'https://example.com/avatar.png';
  autor.linkRefenceAuthor = 'https://example.com/portafolio';
  return autor;
}

function publicacionMock(overrides?: Partial<PostViewModel>): PostViewModel {
  return {
    id: '1',
    slug: 'test',
    titulo: 'Título de prueba',
    contenidoHtml: '<p>Contenido</p>',
    resumenHtml: '<p>Resumen</p>',
    fechaPublicacion: '2026-01-01',
    fechaModificacion: '2026-01-02',
    categoria: 'categoria-test',
    categoriaNombre: 'Developer',
    autor: overrides?.autor
  };
}

describe('PostBaseComponent', () => {
  describe('con slug en la ruta', () => {
    let fixture: ComponentFixture<PostBaseComponent>;
    let component: PostBaseComponent;
    let blogContent: jasmine.SpyObj<BlogContentService>;

    beforeEach(async () => {
      blogContent = jasmine.createSpyObj<BlogContentService>('BlogContentService', [
        'hasBaseUrl',
        'getPostBySlug'
      ]);

      await TestBed.configureTestingModule({
        imports: [PostBaseComponent, TranslateModule.forRoot()],
        providers: [
          { provide: BlogContentService, useValue: blogContent },
          {
            provide: ActivatedRoute,
            useValue: { snapshot: { paramMap: convertToParamMap({ slug: 'mi-slug' }) } }
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(PostBaseComponent);
      component = fixture.componentInstance;
    });

    it('debe crearse', () => {
      blogContent.hasBaseUrl.and.returnValue(true);
      blogContent.getPostBySlug.and.returnValue(of(null));
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('debe mostrar sin-api si no hay URL de API configurada', () => {
      blogContent.hasBaseUrl.and.returnValue(false);
      fixture.detectChanges();

      const el: HTMLElement = fixture.nativeElement.querySelector('[data-testid="post-base-sin-api"]');
      expect(el).toBeTruthy();
      expect(component.estado).toBe('sin-api');
      expect(blogContent.getPostBySlug).not.toHaveBeenCalled();
    });

    it('debe mostrar error si el servicio falla', () => {
      blogContent.hasBaseUrl.and.returnValue(true);
      blogContent.getPostBySlug.and.returnValue(throwError(() => new Error('fallo de red')));
      fixture.detectChanges();

      const el: HTMLElement = fixture.nativeElement.querySelector('[data-testid="post-base-error"]');
      expect(el).toBeTruthy();
      expect(component.estado).toBe('error');
    });

    it('debe mostrar no-encontrado si el API devuelve null', () => {
      blogContent.hasBaseUrl.and.returnValue(true);
      blogContent.getPostBySlug.and.returnValue(of(null));
      fixture.detectChanges();

      const el: HTMLElement = fixture.nativeElement.querySelector('[data-testid="post-base-no-encontrado"]');
      expect(el).toBeTruthy();
      expect(component.estado).toBe('no-encontrado');
    });

    it('debe renderizar título y cuerpo cuando hay publicación', () => {
      blogContent.hasBaseUrl.and.returnValue(true);
      blogContent.getPostBySlug.and.returnValue(of(publicacionMock()));
      fixture.detectChanges();

      expect(component.estado).toBe('listo');
      const titulo: HTMLElement | null = fixture.nativeElement.querySelector('.titulo-post-responsive');
      expect(titulo?.textContent).toContain('Título de prueba');
      const cuerpo: HTMLElement | null = fixture.nativeElement.querySelector('.post-base__cuerpo');
      expect(cuerpo?.textContent).toContain('Contenido');
    });

    it('debe renderizar app-content-author tipo 3 cuando la publicación tiene autor', () => {
      blogContent.hasBaseUrl.and.returnValue(true);
      blogContent.getPostBySlug.and.returnValue(of(publicacionMock({ autor: autorMock() })));
      fixture.detectChanges();

      const autorEl: HTMLElement | null = fixture.nativeElement.querySelector('app-content-author');
      expect(autorEl).withContext('app-content-author').not.toBeNull();
      expect(autorEl?.getAttribute('ng-reflect-tipo')).toBe('3');
      expect(fixture.nativeElement.querySelector('.autor-post')).not.toBeNull();
    });

    it('no debe renderizar app-content-author cuando la publicación no tiene autor', () => {
      blogContent.hasBaseUrl.and.returnValue(true);
      blogContent.getPostBySlug.and.returnValue(of(publicacionMock()));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('app-content-author')).toBeNull();
    });
  });

  describe('con slug vacío en la ruta', () => {
    it('debe mostrar no-encontrado y no llamar al servicio', async () => {
      TestBed.resetTestingModule();

      const blogContent = jasmine.createSpyObj<BlogContentService>('BlogContentService', [
        'hasBaseUrl',
        'getPostBySlug'
      ]);
      blogContent.hasBaseUrl.and.returnValue(true);

      await TestBed.configureTestingModule({
        imports: [PostBaseComponent, TranslateModule.forRoot()],
        providers: [
          { provide: BlogContentService, useValue: blogContent },
          {
            provide: ActivatedRoute,
            useValue: { snapshot: { paramMap: convertToParamMap({ slug: '' }) } }
          }
        ]
      }).compileComponents();

      const fixture = TestBed.createComponent(PostBaseComponent);
      fixture.detectChanges();

      const el: HTMLElement = fixture.nativeElement.querySelector('[data-testid="post-base-no-encontrado"]');
      expect(el).toBeTruthy();
      expect(fixture.componentInstance.estado).toBe('no-encontrado');
      expect(blogContent.getPostBySlug).not.toHaveBeenCalled();
    });
  });
});
