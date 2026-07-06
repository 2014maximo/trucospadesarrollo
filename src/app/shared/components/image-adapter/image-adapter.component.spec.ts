import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAdapterComponent } from './image-adapter.component';
import { ImageAdapterModel } from '../../models/image-adapter.model';

describe('ImageAdapterComponent', () => {
  let component: ImageAdapterComponent;
  let fixture: ComponentFixture<ImageAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageAdapterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageAdapterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('no debe renderizar la imagen si image.src está vacío', () => {
    component.image = new ImageAdapterModel();
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeNull();
  });

  it('debe renderizar la imagen y aplicar image desde ImageAdapterModel', () => {
    const model = Object.assign(new ImageAdapterModel(), {
      src: 'assets/test.png',
      alt: 'Texto alternativo',
      customClass: 'img-fluid',
      showZoomIcon: false
    });
    component.image = model;
    fixture.detectChanges();

    const img: HTMLImageElement | null = fixture.nativeElement.querySelector('.main-image');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('test.png');
    expect(img?.alt).toBe('Texto alternativo');
    expect(component.hostClasses).toContain('img-fluid');
  });

  it('type-A por defecto debe mostrar el icono de zoom', () => {
    component.image = Object.assign(new ImageAdapterModel(), {
      src: 'assets/test.png',
      alt: 'Alt'
    });
    fixture.detectChanges();
    const zoom = fixture.nativeElement.querySelector('.zoom-icon');
    expect(zoom).toBeTruthy();
    expect(component.isTypeB).toBe(false);
  });

  it('type-B debe renderizar la imagen con marco (.marcoFoto) y src/alt', () => {
    component.image = Object.assign(new ImageAdapterModel(), {
      src: 'assets/busqueda-empleo.jpg',
      alt: 'Predisposición en la búsqueda de empleo',
      typeImage: 'type-B'
    });
    fixture.detectChanges();

    const img: HTMLImageElement | null = fixture.nativeElement.querySelector('.marcoFoto');
    expect(img).toBeTruthy();
    expect(img?.src).toContain('busqueda-empleo.jpg');
    expect(img?.alt).toBe('Predisposición en la búsqueda de empleo');
    expect(img?.getAttribute('width')).toBe('100%');
    const wrapper = fixture.nativeElement.querySelector('.bord');
    expect(wrapper).toBeTruthy();
    expect(component.isTypeB).toBe(true);
  });

  it('type-B no debe mostrar el icono de zoom ni abrir modal', () => {
    component.image = Object.assign(new ImageAdapterModel(), {
      src: 'assets/test.png',
      typeImage: 'type-B'
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.zoom-icon')).toBeNull();
    expect(fixture.nativeElement.querySelector('.main-image')).toBeNull();
    expect(component.isModalOpen).toBe(false);
  });

  it('type-B debe renderizar el crédito (enlace y texto) cuando hay creditUrl', () => {
    component.image = Object.assign(new ImageAdapterModel(), {
      src: 'assets/test.png',
      typeImage: 'type-B',
      creditUrl: 'https://unsplash.com/',
      creditText: 'Jeremy Bishop - Unsplash'
    });
    fixture.detectChanges();

    const link: HTMLAnchorElement | null = fixture.nativeElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('https://unsplash.com/');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.querySelector('small')?.textContent).toBe('Jeremy Bishop - Unsplash');
  });

  it('type-B no debe renderizar el enlace de crédito si creditUrl está vacío', () => {
    component.image = Object.assign(new ImageAdapterModel(), {
      src: 'assets/test.png',
      typeImage: 'type-B',
      creditText: 'Autor'
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a')).toBeNull();
  });
});
