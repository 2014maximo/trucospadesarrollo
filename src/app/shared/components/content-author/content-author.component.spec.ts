import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAuthorComponent } from './content-author.component';
import { ContentAuthorModel } from '../../models/content-author.model';

describe('ContentAuthorComponent', () => {
  let component: ContentAuthorComponent;
  let fixture: ComponentFixture<ContentAuthorComponent>;

  function autorMock(): ContentAuthorModel {
    const autor = new ContentAuthorModel();
    autor.name = 'Alex';
    autor.srcAvatar = 'https://example.com/avatar.png';
    autor.linkRefenceAuthor = 'https://example.com/portafolio';
    autor.introduction = 'Intro';
    return autor;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentAuthorComponent);
    component = fixture.componentInstance;
    component.datesAuthor = autorMock();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('tipo 1 (por defecto)', () => {
    it('debe renderizar la presentación de bloque', () => {
      const section = fixture.nativeElement.querySelector('section.post-meta');
      expect(section).withContext('section.post-meta').not.toBeNull();
      expect(fixture.nativeElement.querySelector('.autor-compacto')).toBeNull();
    });

    it('debe mostrar el avatar y el nombre enlazado', () => {
      const img = fixture.nativeElement.querySelector('section.post-meta img');
      const link = fixture.nativeElement.querySelector('section.post-meta a');
      expect(img.getAttribute('src')).toBe('https://example.com/avatar.png');
      expect(link.getAttribute('href')).toBe('https://example.com/portafolio');
      expect(link.textContent.trim()).toBe('Alex');
    });
  });

  describe('tipo 2 (compacto)', () => {
    beforeEach(() => {
      component.tipo = 2;
      fixture.detectChanges();
    });

    it('debe renderizar la presentación compacta', () => {
      const compacto = fixture.nativeElement.querySelector('.autor-compacto');
      expect(compacto).withContext('.autor-compacto').not.toBeNull();
      expect(fixture.nativeElement.querySelector('section.post-meta')).toBeNull();
    });

    it('debe mostrar el avatar pequeño y el nombre enlazado', () => {
      const img = fixture.nativeElement.querySelector('.autor-compacto img.avatar-compacto');
      const link = fixture.nativeElement.querySelector('.autor-compacto a');
      expect(img.getAttribute('src')).toBe('https://example.com/avatar.png');
      expect(img.getAttribute('alt')).toBe('Alex');
      expect(link.getAttribute('href')).toBe('https://example.com/portafolio');
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.textContent.trim()).toBe('Alex');
    });

    it('no debe aplicar las clases del tipo 3', () => {
      expect(fixture.nativeElement.querySelector('.autor-post')).toBeNull();
      expect(fixture.nativeElement.querySelector('.avatar-post')).toBeNull();
    });
  });

  describe('tipo 3 (mediano para vista del post)', () => {
    beforeEach(() => {
      component.tipo = 3;
      fixture.detectChanges();
    });

    it('debe renderizar la presentación compacta con clases de avatar mediano', () => {
      expect(fixture.nativeElement.querySelector('.autor-compacto.autor-post')).withContext('.autor-post').not.toBeNull();
      expect(fixture.nativeElement.querySelector('img.avatar-compacto.avatar-post')).withContext('.avatar-post').not.toBeNull();
      expect(fixture.nativeElement.querySelector('section.post-meta')).toBeNull();
    });

    it('debe mostrar el avatar y el nombre enlazado', () => {
      const img = fixture.nativeElement.querySelector('.autor-compacto img');
      const link = fixture.nativeElement.querySelector('.autor-compacto a');
      expect(img.getAttribute('src')).toBe('https://example.com/avatar.png');
      expect(img.getAttribute('alt')).toBe('Alex');
      expect(link.getAttribute('href')).toBe('https://example.com/portafolio');
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.textContent.trim()).toBe('Alex');
    });
  });
});
