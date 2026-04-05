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
    expect(img?.src).toContain('assets/test.png');
    expect(img?.alt).toBe('Texto alternativo');
    expect(component.hostClasses).toContain('img-fluid');
  });
});
