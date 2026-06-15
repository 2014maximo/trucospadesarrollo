import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import { BlogContentService } from 'src/app/features/blog/services/blog-content.service';
import { HeaderPostComponent } from './header-post.component';

function postMock(overrides?: any): any {
  return {
    id: overrides?.id ?? '1',
    slug: overrides?.slug ?? 'post-slug',
    titulo: overrides?.titulo ?? 'Título de prueba',
    contenidoHtml: '',
    resumenHtml: '',
    fechaPublicacion: '2026-01-01',
    fechaModificacion: '2026-01-02',
    categoria: 'cat-1',
    categoriaNombre: overrides?.categoriaNombre ?? 'Developer',
    imagenDestacada: ''
  };
}

describe('HeaderPostComponent', () => {
  let component: HeaderPostComponent;
  let fixture: ComponentFixture<HeaderPostComponent>;
  let blogContent: jasmine.SpyObj<BlogContentService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    blogContent = jasmine.createSpyObj<BlogContentService>('BlogContentService', [
      'hasBaseUrl',
      'searchPosts'
    ]);
    router = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [HeaderPostComponent, TranslateModule.forRoot()],
      providers: [
        { provide: BlogContentService, useValue: blogContent },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderPostComponent);
    component = fixture.componentInstance;
    component.ondestroy$ = new Subject<boolean>();
    fixture.detectChanges();
  });

  it('should create', () => {
    blogContent.hasBaseUrl.and.returnValue(false);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('buscar', () => {
    it('debe limpiar resultados cuando el término está vacío', () => {
      component.formBasic.get('busqueda')?.setValue('');
      component.buscar();

      expect(component.mostrarResultados).toBeFalse();
      expect(component.encontrados.length).toBe(0);
      expect(blogContent.searchPosts).not.toHaveBeenCalled();
    });

    it('debe mostrar resultados y activar búsqueda con término válido', fakeAsync(() => {
      blogContent.searchPosts.and.returnValue(of([
        postMock({ titulo: 'Post React', slug: 'otro-post', categoriaNombre: 'React' })
      ]));

      component.formBasic.get('busqueda')?.setValue('react');
      component.buscar();

      expect(component.mostrarResultados).toBeTrue();
      expect(component.buscando).toBeTrue();

      tick(300);

      expect(blogContent.searchPosts).toHaveBeenCalledWith('react', 8);
      expect(component.buscando).toBeFalse();
      expect(component.encontrados.length).toBe(1);
      expect(component.encontrados[0].titulo).toBe('Post React');
      expect(component.encontrados[0].ruta).toBe('/blog/react/otro-post');
    }));

    it('debe navegar al hacer click en un resultado', () => {
      component.irAlPost('/blog/react/test-post');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/blog/react/test-post');
    });
  });
});
