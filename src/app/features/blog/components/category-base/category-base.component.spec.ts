import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryBaseComponent } from './category-base.component';
import { BlogContentService } from '../../services/blog-content.service';
import { CategoryViewModel } from '../../models/category-view.model';
import { PostViewModel } from '../../models/post-view.model';

const mockCategoria: CategoryViewModel = {
  id: '1',
  slug: 'developer',
  titulo: 'Developer',
  contenidoHtml: '<p>Contenido de la categoría</p>'
};

const mockPosts: PostViewModel[] = [
  {
    id: '10',
    slug: 'instalacion-de-angular-y-recomendaciones',
    uri: '/instalacion-de-angular-y-recomendaciones/',
    titulo: 'Instalación de Angular y recomendaciones',
    contenidoHtml: '',
    resumenHtml: '',
    fechaPublicacion: '',
    fechaModificacion: '',
    categoria: '',
    categoriaNombre: 'angular'
  }
];

describe('CategoryBaseComponent', () => {
  let component: CategoryBaseComponent;
  let fixture: ComponentFixture<CategoryBaseComponent>;
  let blogContentSpy: jasmine.SpyObj<BlogContentService>;

  function createComponent(slug: string, hasApi: boolean = true) {
    blogContentSpy = jasmine.createSpyObj('BlogContentService', [
      'hasBaseUrl',
      'getCategoryBySlug',
      'getPostsByCategory'
    ]);
    blogContentSpy.hasBaseUrl.and.returnValue(hasApi);
    blogContentSpy.getPostsByCategory.and.returnValue(of(mockPosts));

    TestBed.configureTestingModule({
      imports: [CategoryBaseComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => slug } } }
        },
        { provide: BlogContentService, useValue: blogContentSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryBaseComponent);
    component = fixture.componentInstance;
  }

  it('debe mostrar estado sin-api si no hay URL configurada', () => {
    createComponent('developer', false);
    fixture.detectChanges();
    expect(component.estado).toBe('sin-api');
    expect(blogContentSpy.getCategoryBySlug).not.toHaveBeenCalled();
  });

  it('debe mostrar estado no-encontrado si el slug está vacío', () => {
    createComponent('');
    fixture.detectChanges();
    expect(component.estado).toBe('no-encontrado');
    expect(blogContentSpy.getCategoryBySlug).not.toHaveBeenCalled();
  });

  it('debe mostrar estado no-encontrado si el servicio emite null', () => {
    createComponent('developer');
    blogContentSpy.getCategoryBySlug.and.returnValue(of(null));
    fixture.detectChanges();
    expect(component.estado).toBe('no-encontrado');
  });

  it('debe mostrar estado error si el servicio lanza error', () => {
    createComponent('developer');
    blogContentSpy.getCategoryBySlug.and.returnValue(
      throwError(() => new Error('HTTP error'))
    );
    fixture.detectChanges();
    expect(component.estado).toBe('error');
  });

  it('debe mostrar estado listo y renderizar el contenido', () => {
    createComponent('developer');
    blogContentSpy.getCategoryBySlug.and.returnValue(of(mockCategoria));
    fixture.detectChanges();
    expect(component.estado).toBe('listo');
    expect(component.categoria).toEqual(mockCategoria);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="category-base-contenido"]')).toBeTruthy();
  });

  it('debe construir el índice con el uri absoluto de cada post de la categoría', () => {
    createComponent('angular');
    blogContentSpy.getCategoryBySlug.and.returnValue(of(mockCategoria));
    fixture.detectChanges();

    expect(blogContentSpy.getPostsByCategory).toHaveBeenCalledWith('angular');
    expect(component.indice.length).toBe(1);
    expect(component.indice[0].ruta).toBe('/blog/angular/instalacion-de-angular-y-recomendaciones');
    expect(component.indice[0].nombre).toBe('Instalación de Angular y recomendaciones');
    expect(component.indice[0].estado).toBe('activo');
    // Angular tiene fondo oscuro (bg-Angular) → texto blanco
    expect(component.indice[0].color).toBe('text-white');
    expect(component.indice[0].colorFondo).toBe('bg-Angular');
  });

  it('debe usar texto oscuro para categorías de fondo muy claro', () => {
    createComponent('developer');
    blogContentSpy.getCategoryBySlug.and.returnValue(of(mockCategoria));
    fixture.detectChanges();

    expect(blogContentSpy.getPostsByCategory).toHaveBeenCalledWith('developer');
    // Developer tiene fondo claro (bg-Developer) → texto oscuro
    expect(component.indice[0].color).toBe('text-dark');
    expect(component.indice[0].colorFondo).toBe('bg-Developer');
  });
});
