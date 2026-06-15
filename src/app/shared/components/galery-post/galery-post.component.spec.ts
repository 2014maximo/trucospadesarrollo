import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError, Subject } from 'rxjs';
import { BlogContentService } from 'src/app/features/blog/services/blog-content.service';
import { PostViewModel } from 'src/app/features/blog/models/post-view.model';
import { TraduccionService } from '../../services/traduccion.service';
import { GaleryPostComponent } from './galery-post.component';

function postMock(overrides?: Partial<PostViewModel>): PostViewModel {
  return {
    id: overrides?.id ?? '1',
    slug: overrides?.slug ?? 'post-slug',
    titulo: overrides?.titulo ?? 'Título de prueba',
    contenidoHtml: overrides?.contenidoHtml ?? '<p>Contenido</p>',
    resumenHtml: overrides?.resumenHtml ?? '<p>Resumen de prueba</p>',
    fechaPublicacion: overrides?.fechaPublicacion ?? '2026-01-01',
    fechaModificacion: overrides?.fechaModificacion ?? '2026-01-02',
    categoria: overrides?.categoria ?? 'cat-1',
    categoriaNombre: overrides?.categoriaNombre ?? 'Developer',
    imagenDestacada: overrides?.imagenDestacada ?? 'https://example.com/img.jpg'
  };
}

describe('GaleryPostComponent', () => {
  let component: GaleryPostComponent;
  let fixture: ComponentFixture<GaleryPostComponent>;
  let blogContent: jasmine.SpyObj<BlogContentService>;
  let traduccion: jasmine.SpyObj<TraduccionService>;

  beforeEach(async () => {
    blogContent = jasmine.createSpyObj<BlogContentService>('BlogContentService', [
      'hasBaseUrl',
      'getLatestPosts'
    ]);
    traduccion = jasmine.createSpyObj<TraduccionService>('TraduccionService', [], {
      cambioIdioma$: new Subject<string>().asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [GaleryPostComponent, TranslateModule.forRoot()],
      providers: [
        { provide: BlogContentService, useValue: blogContent },
        { provide: TraduccionService, useValue: traduccion }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GaleryPostComponent);
    component = fixture.componentInstance;
  });

  it('debe crearse', () => {
    blogContent.hasBaseUrl.and.returnValue(false);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('sin API configurada', () => {
    it('debe tener estado sin-api', () => {
      blogContent.hasBaseUrl.and.returnValue(false);
      fixture.detectChanges();

      expect(component.estado).toBe('sin-api');
    });
  });

  describe('con API configurada', () => {
    beforeEach(() => {
      blogContent.hasBaseUrl.and.returnValue(true);
    });

    it('debe mostrar listo cuando hay posts', () => {
      blogContent.getLatestPosts.and.returnValue(of([
        postMock(),
        postMock({ id: '2', slug: 'segundo-post' })
      ]));
      fixture.detectChanges();

      expect(component.estado).toBe('listo');
      expect(component.todosLosPost.length).toBe(2);
    });

    it('debe mostrar vacio cuando no hay posts', () => {
      blogContent.getLatestPosts.and.returnValue(of([]));
      fixture.detectChanges();

      expect(component.estado).toBe('vacio');
      expect(component.todosLosPost.length).toBe(0);
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

      expect(component.todosLosPost[0].ruta).toBe('/blog/angular/mi-post');
    });

    it('debe extraer texto plano del resumen HTML', () => {
      blogContent.getLatestPosts.and.returnValue(of([
        postMock({ resumenHtml: '<p>Resumen <strong>HTML</strong></p>' })
      ]));
      fixture.detectChanges();

      expect(component.todosLosPost[0].resumen).toBe('Resumen HTML');
    });

    it('debe usar fechaModificacion si está disponible', () => {
      blogContent.getLatestPosts.and.returnValue(of([
        postMock({
          fechaPublicacion: '2026-01-01',
          fechaModificacion: '2026-06-01'
        })
      ]));
      fixture.detectChanges();

      expect(component.todosLosPost[0].fecha).toBe('2026-06-01');
    });

    it('debe usar fechaPublicacion si no hay fechaModificacion', () => {
      blogContent.getLatestPosts.and.returnValue(of([
        postMock({
          fechaPublicacion: '2026-03-15',
          fechaModificacion: ''
        })
      ]));
      fixture.detectChanges();

      expect(component.todosLosPost[0].fecha).toBe('2026-03-15');
    });

    it('debe recibir elementos paginados del paginador', () => {
      blogContent.getLatestPosts.and.returnValue(of([
        postMock(),
        postMock({ id: '2', slug: 'post-dos' }),
        postMock({ id: '3', slug: 'post-tres' })
      ]));
      fixture.detectChanges();

      const pagina = [component.todosLosPost[0]];
      component.recibirCantidadElementos(pagina);

      expect(component.postPaginar.length).toBe(1);
      expect(component.postPaginar[0].id).toBe('1');
    });

    it('tipoSombra debe devolver drop para URLs con png', () => {
      blogContent.hasBaseUrl.and.returnValue(true);
      blogContent.getLatestPosts.and.returnValue(of([]));
      fixture.detectChanges();

      expect(component.tipoSombra('img.png')).toBe('drop');
      expect(component.tipoSombra('img.jpg')).toBe('marcoFoto shadow-two');
    });

    it('referenciaImagen debe devolver contenido si no está vacío', () => {
      expect(component.referenciaImagen('default', 'contenido')).toBe('contenido');
      expect(component.referenciaImagen('default', '')).toBe('default');
    });
  });
});
