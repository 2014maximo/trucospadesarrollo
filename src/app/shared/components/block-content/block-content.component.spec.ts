import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockContentComponent } from './block-content.component';
import { BlockContentModel } from '../../models/block-content.model';

describe('BlockContentComponent', () => {
  let component: BlockContentComponent;
  let fixture: ComponentFixture<BlockContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar un <a> con href, target y rel cuando el párrafo tiene url', () => {
    component.blockContent = bloqueCon({
      paragraph: [{ text: 'Texto del enlace', url: 'https://ejemplo.com', target: '_blank' }]
    });
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('p a');
    expect(anchor).withContext('el párrafo debe contener un <a>').toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('https://ejemplo.com');
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toContain('noopener');
    expect(anchor.textContent).toContain('Texto del enlace');
  });

  it('debe renderizar un <a> dentro del h4 cuando el título tiene url', () => {
    component.blockContent = bloqueCon({
      title: { text: 'Título con enlace', url: 'https://ejemplo.com/titulo' }
    });
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('h4 a');
    expect(anchor).withContext('el título debe contener un <a>').toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('https://ejemplo.com/titulo');
    expect(anchor.textContent).toContain('Título con enlace');
  });

  it('debe renderizar un <a> dentro del h5 cuando el subtítulo tiene url', () => {
    component.blockContent = bloqueCon({
      subtitle: { text: 'Subtítulo con enlace', url: 'https://ejemplo.com/subtitulo', target: '_self' }
    });
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('h5 a');
    expect(anchor).withContext('el subtítulo debe contener un <a>').toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('https://ejemplo.com/subtitulo');
    expect(anchor.getAttribute('target')).toBe('_self');
  });

  it('no debe renderizar <a> cuando los textos no tienen url', () => {
    component.blockContent = bloqueCon({
      title: { text: 'Título plano' },
      subtitle: { text: 'Subtítulo plano' },
      paragraph: [{ text: 'Párrafo plano' }]
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a')).toBeNull();
    expect(fixture.nativeElement.querySelector('h4').textContent).toContain('Título plano');
    expect(fixture.nativeElement.querySelector('h5').textContent).toContain('Subtítulo plano');
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('Párrafo plano');
  });
});

function bloqueCon(contentBlock: {
  title?: { text?: string; url?: string; target?: string };
  subtitle?: { text?: string; url?: string; target?: string };
  paragraph?: { text?: string; url?: string; target?: string }[];
}): BlockContentModel[] {
  return [
    {
      blocks: [
        {
          initialStyle: 'col-md-12',
          columns: [contentBlock]
        }
      ]
    }
  ];
}
