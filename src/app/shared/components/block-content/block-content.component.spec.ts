import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockContentComponent } from './block-content.component';
import { BlockContentModel, RowBlocks } from '../../models/block-content.model';

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

  it('no debe renderizar h4/h5 cuando el bloque no tiene title ni subtitle', () => {
    component.blockContent = bloqueCon({
      paragraph: [{ text: 'Solo párrafo' }]
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h4')).toBeNull();
    expect(fixture.nativeElement.querySelector('h5')).toBeNull();
  });

  it('debe renderizar recursivamente los blocks anidados dentro de una columna', () => {
    component.blockContent = bloqueCon({
      blocks: [
        {
          initialStyle: 'col-md-8',
          columns: [
            { subtitle: { text: 'Subtítulo anidado' } },
            { paragraph: [{ text: 'Párrafo anidado' }] }
          ]
        }
      ]
    });
    fixture.detectChanges();

    const anidado = fixture.nativeElement.querySelector('app-block-content');
    expect(anidado).withContext('debe existir un app-block-content recursivo').toBeTruthy();
    expect(anidado.querySelector('.col-md-8 h5').textContent).toContain('Subtítulo anidado');
    expect(anidado.querySelector('.col-md-8 p').textContent).toContain('Párrafo anidado');
  });

  it('debe soportar dos niveles de anidamiento', () => {
    component.blockContent = bloqueCon({
      blocks: [
        {
          initialStyle: 'col-md-6',
          columns: [
            {
              blocks: [
                {
                  initialStyle: 'col-md-4',
                  columns: [{ paragraph: [{ text: 'Nivel 3' }] }]
                }
              ]
            }
          ]
        }
      ]
    });
    fixture.detectChanges();

    const nivel2 = fixture.nativeElement.querySelector('app-block-content');
    const nivel3 = nivel2?.querySelector('app-block-content');
    expect(nivel3).withContext('debe existir el segundo nivel recursivo').toBeTruthy();
    expect(nivel3.querySelector('p').textContent).toContain('Nivel 3');
  });

  it('debe aplicar styleCol como clase del row anidado', () => {
    component.blockContent = bloqueCon({
      styleCol: 'g-0 align-items-center',
      blocks: [
        {
          initialStyle: 'col-md-12',
          columns: [{ paragraph: [{ text: 'Contenido' }] }]
        }
      ]
    });
    fixture.detectChanges();

    const rowAnidado = fixture.nativeElement.querySelector('app-block-content > div');
    expect(rowAnidado).toBeTruthy();
    expect(rowAnidado.classList).toContain('row');
    expect(rowAnidado.classList).toContain('g-0');
    expect(rowAnidado.classList).toContain('align-items-center');
  });

  it('debe aplicar rowStyle como clase del row de primer nivel', () => {
    component.blockContent = [
      {
        rowStyle: 'mi-clase-row',
        blocks: [
          {
            initialStyle: 'col-md-12',
            columns: [{ paragraph: [{ text: 'Texto' }] }]
          }
        ]
      }
    ];
    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('div.row');
    expect(row.classList).toContain('mi-clase-row');
  });
});

function bloqueCon(contentBlock: {
  title?: { text?: string; url?: string; target?: string };
  subtitle?: { text?: string; url?: string; target?: string };
  paragraph?: { text?: string; url?: string; target?: string }[];
  styleCol?: string;
  blocks?: RowBlocks[];
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
