import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { BlogContentService } from 'src/app/features/blog/services/blog-content.service';
import { PostViewModel } from 'src/app/features/blog/models/post-view.model';
import { SliderHomeComponent } from './slider-home.component';

function postMock(overrides?: Partial<PostViewModel>): PostViewModel {
  return {
    id: overrides?.id ?? '1',
    slug: overrides?.slug ?? 'post-slug',
    titulo: overrides?.titulo ?? 'Título de prueba',
    contenidoHtml: overrides?.contenidoHtml ?? '<p>Contenido</p>',
    resumenHtml: overrides?.resumenHtml ?? '<p>Resumen</p>',
    fechaPublicacion: overrides?.fechaPublicacion ?? '2026-01-01',
    fechaModificacion: overrides?.fechaModificacion ?? '2026-01-02',
    categoria: overrides?.categoria ?? 'cat-1',
    categoriaNombre: overrides?.categoriaNombre ?? 'Developer',
    imagenDestacada: overrides?.imagenDestacada ?? 'https://example.com/img.jpg'
  };
}

describe('SliderHomeComponent', () => {
  let component: SliderHomeComponent;
  let fixture: ComponentFixture<SliderHomeComponent>;
  let blogContent: jasmine.SpyObj<BlogContentService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    blogContent = jasmine.createSpyObj<BlogContentService>('BlogContentService', [
      'hasBaseUrl',
      'getLatestPosts'
    ]);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SliderHomeComponent, TranslateModule.forRoot()],
      providers: [
        { provide: BlogContentService, useValue: blogContent },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SliderHomeComponent);
    component = fixture.componentInstance;
  });

  it('debe crearse', () => {
    blogContent.hasBaseUrl.and.returnValue(false);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('sin API configurada', () => {
    it('debe tener estado oculto', () => {
      blogContent.hasBaseUrl.and.returnValue(false);
      fixture.detectChanges();

      expect(component.estado).toBe('oculto');
    });
  });

  describe('con API configurada', () => {
    beforeEach(() => {
      blogContent.hasBaseUrl.and.returnValue(true);
    });

    it('debe mostrar listo cuando hay posts con imagen', () => {
      blogContent.getLatestPosts.and.returnValue(of([
        postMock({ imagenDestacada: 'https://example.com/a.jpg' }),
        postMock({ id: '2', imagenDestacada: 'https://example.com/b.jpg' })
      ]));
      fixture.detectChanges();

      expect(component.estado).toBe('listo');
      expect(component.slides.length).toBe(2);
    });

    it('debe mostrar vacio cuando los posts no tienen imagen', () => {
      blogContent.getLatestPosts.and.returnValue(of([
        postMock({ imagenDestacada: '' })
      ]));
      fixture.detectChanges();

      expect(component.estado).toBe('vacio');
      expect(component.slides.length).toBe(0);
    });

    it('debe mostrar error si el servicio falla', () => {
      blogContent.getLatestPosts.and.returnValue(throwError(() => new Error('fallo')));
      fixture.detectChanges();

      expect(component.estado).toBe('error');
    });

    it('debe construir la ruta a partir de categoriaNombre y slug', () => {
      blogContent.getLatestPosts.and.returnValue(of([
        postMock({ categoriaNombre: 'Angular', slug: 'mi-post' })
      ]));
      fixture.detectChanges();

      expect(component.slides[0].ruta).toBe('/blog/angular/mi-post');
    });

    it('irAlPost debe navegar a la ruta indicada', () => {
      component.irAlPost('/blog/developer/test');
      expect(router.navigate).toHaveBeenCalledWith(['/blog/developer/test']);
    });

    it('debe renderizar el carrusel con slides', () => {
      blogContent.getLatestPosts.and.returnValue(of([
        postMock({ titulo: 'Post Uno', imagenDestacada: 'https://example.com/1.jpg' }),
        postMock({ id: '2', titulo: 'Post Dos', imagenDestacada: 'https://example.com/2.jpg' })
      ]));
      fixture.detectChanges();

      const el: HTMLElement = fixture.nativeElement.querySelector('[data-testid="slider-list"]');
      expect(el).toBeTruthy();
      const items = el.querySelectorAll('.carousel-item');
      expect(items.length).toBe(2);
    });

    it('el segundo slide debe tener clase reverse para alternar diseño', () => {
      blogContent.getLatestPosts.and.returnValue(of([
        postMock({ titulo: 'A', imagenDestacada: 'https://example.com/a.jpg' }),
        postMock({ id: '2', titulo: 'B', imagenDestacada: 'https://example.com/b.jpg' })
      ]));
      fixture.detectChanges();

      const slides = fixture.nativeElement.querySelectorAll('.slider-home__slide');
      expect(slides[0].classList).not.toContain('slider-home__slide--reverse');
      expect(slides[1].classList).toContain('slider-home__slide--reverse');
    });
  });
});
