import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import { BlogContentService } from 'src/app/features/blog/services/blog-content.service';
import { TraduccionService } from '../../services/traduccion.service';
import { HeaderComponent } from './header.component';

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

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let blogContent: jasmine.SpyObj<BlogContentService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    blogContent = jasmine.createSpyObj<BlogContentService>('BlogContentService', [
      'hasBaseUrl',
      'searchPosts'
    ]);
    router = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, TranslateModule.forRoot()],
      providers: [
        { provide: BlogContentService, useValue: blogContent },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
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
        postMock({ titulo: 'Post Angular', slug: 'mi-post', categoriaNombre: 'Angular' })
      ]));

      component.formBasic.get('busqueda')?.setValue('angular');
      component.buscar();

      expect(component.mostrarResultados).toBeTrue();
      expect(component.buscando).toBeTrue();

      tick(300);

      expect(blogContent.searchPosts).toHaveBeenCalledWith('angular', 8);
      expect(component.buscando).toBeFalse();
      expect(component.encontrados.length).toBe(1);
      expect(component.encontrados[0].titulo).toBe('Post Angular');
      expect(component.encontrados[0].ruta).toBe('/blog/angular/mi-post');
    }));

    it('no debe llamar a la API si el término no cambia', fakeAsync(() => {
      blogContent.searchPosts.and.returnValue(of([]));

      component.formBasic.get('busqueda')?.setValue('react');
      component.buscar();
      tick(300);
      expect(blogContent.searchPosts).toHaveBeenCalledTimes(1);

      component.formBasic.get('busqueda')?.setValue('react');
      component.buscar();
      tick(300);
      expect(blogContent.searchPosts).toHaveBeenCalledTimes(1);
    }));

    it('debe navegar al hacer click en un resultado', () => {
      component.irAlPost('/blog/developer/test-post');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/blog/developer/test-post');
    });

    it('debe ocultar resultados tras el blur con retardo', fakeAsync(() => {
      component.mostrarResultados = true;
      component.buscando = true;

      component.desaparecerTablaBusqueda();
      tick(2100);

      expect(component.mostrarResultados).toBeFalse();
      expect(component.buscando).toBeFalse();
    }));
  });
});
