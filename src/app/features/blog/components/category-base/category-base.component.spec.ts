import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryBaseComponent } from './category-base.component';
import { BlogContentService } from '../../services/blog-content.service';
import { CategoryViewModel } from '../../models/category-view.model';

const mockCategoria: CategoryViewModel = {
  id: '1',
  slug: 'developer',
  titulo: 'Developer',
  contenidoHtml: '<p>Contenido de la categoría</p>'
};

describe('CategoryBaseComponent', () => {
  let component: CategoryBaseComponent;
  let fixture: ComponentFixture<CategoryBaseComponent>;
  let blogContentSpy: jasmine.SpyObj<BlogContentService>;

  function createComponent(slug: string, hasApi: boolean = true) {
    blogContentSpy = jasmine.createSpyObj('BlogContentService', [
      'hasBaseUrl',
      'getCategoryBySlug'
    ]);
    blogContentSpy.hasBaseUrl.and.returnValue(hasApi);

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
});
