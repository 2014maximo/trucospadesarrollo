import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { GlossaryComponent } from './glossary.component';
import { GlossaryModel } from '../../models/glossary.model';
import { DynamicContentComponent } from '../dynamic-content/dynamic-content.component';

function glosarioMock(): GlossaryModel {
  return {
    color: 'c-Angular',
    terms: [
      { title: 'Señal', category: 'Angular', paragraphs: ['Valor reactivo'] },
      {
        title: 'Componente',
        paragraphs: ['Bloque de interfaz'],
        image: { src: 'https://example.com/componente.png', alt: 'Componente' },
        links: [
          { title: 'Documentación', url: 'https://angular.dev' },
          { title: 'Post', url: '/blog/angular/componentes' }
        ]
      },
      {
        title: 'Inyección',
        sections: [{ titles: ['Ámbitos'], items: ['root', 'plataforma'] }],
        image: { src: 'https://example.com/inyeccion.png' }
      }
    ]
  };
}

describe('GlossaryComponent', () => {
  let component: GlossaryComponent;
  let fixture: ComponentFixture<GlossaryComponent>;
  let el: HTMLElement;

  const titulos = (): string[] =>
    Array.from(el.querySelectorAll('article h4')).map(h => h.textContent?.trim() ?? '');

  async function renderizar(glossary?: unknown): Promise<void> {
    if (glossary !== undefined) {
      fixture.componentRef.setInput('glossary', glossary);
    }
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  async function buscar(texto: string): Promise<void> {
    const input = el.querySelector('input[type="search"]') as HTMLInputElement;
    input.value = texto;
    input.dispatchEvent(new Event('input'));
    await renderizar();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlossaryComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlossaryComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('muestra los términos del JSON ordenados alfabéticamente', async () => {
    await renderizar(glosarioMock());

    expect(titulos()).toEqual(['Componente', 'Inyección', 'Señal']);
  });

  it('no renderiza nada sin términos o con un JSON vacío', async () => {
    await renderizar({});
    expect(el.querySelector('section')).toBeNull();

    await renderizar({ terms: [] });
    expect(el.querySelector('section')).toBeNull();
  });

  it('alterna izquierda y derecha, con la imagen en el lado opuesto', async () => {
    await renderizar(glosarioMock());

    const filas = Array.from(el.querySelectorAll('.row.align-items-center'));
    const [componente, inyeccion, senal] = filas.map(fila => ({
      articulo: fila.querySelector('article') as HTMLElement,
      imagen: fila.querySelector('app-image-adapter')?.parentElement ?? null
    }));

    // 1.º: texto a la izquierda, imagen a la derecha (orden natural)
    expect(componente.articulo.classList).not.toContain('order-md-2');
    expect(componente.imagen).not.toBeNull();
    // 2.º: texto a la derecha, imagen a la izquierda
    expect(inyeccion.articulo.classList).toContain('order-md-2');
    expect(inyeccion.imagen?.classList).toContain('order-md-1');
    // 3.º: de nuevo a la izquierda y sin imagen
    expect(senal.articulo.classList).not.toContain('offset-md-5');
    expect(senal.imagen).toBeNull();
  });

  it('desplaza a la derecha el término impar que no tiene imagen', async () => {
    await renderizar({ terms: [{ title: 'A' }, { title: 'B' }] });

    const articulos = el.querySelectorAll('article');
    expect(articulos[0].classList).not.toContain('offset-md-5');
    expect(articulos[1].classList).toContain('offset-md-5');
  });

  it('busca en título y contenido sin distinguir mayúsculas ni tildes', async () => {
    await renderizar(glosarioMock());

    await buscar('INYECCION');
    expect(titulos()).toEqual(['Inyección']);

    await buscar('ambitos');
    expect(titulos()).toEqual(['Inyección']);

    await buscar('');
    expect(titulos().length).toBe(3);
  });

  it('la X del buscador borra la búsqueda, restaura la lista y devuelve el foco', async () => {
    await renderizar(glosarioMock());
    expect(el.querySelector('.glossary-clear')).toBeNull();

    await buscar('inyeccion');
    expect(titulos()).toEqual(['Inyección']);

    (el.querySelector('.glossary-clear') as HTMLButtonElement).click();
    await renderizar();

    const input = el.querySelector('input[type="search"]') as HTMLInputElement;
    expect(input.value).toBe('');
    expect(titulos().length).toBe(3);
    expect(el.querySelector('.glossary-clear')).toBeNull();
    expect(document.activeElement).toBe(input);
  });

  it('muestra el estado vacío y oculta el paginador cuando no hay coincidencias', async () => {
    await renderizar(glosarioMock());
    await buscar('zzz-inexistente');

    expect(titulos().length).toBe(0);
    expect(el.querySelector('[role="status"]')).not.toBeNull();
    expect(el.querySelector('app-paginator')).toBeNull();
  });

  it('abre los enlaces externos en otra pestaña y enruta los internos', async () => {
    await renderizar(glosarioMock());

    const enlaces = Array.from(el.querySelectorAll('article a')) as HTMLAnchorElement[];
    const externo = enlaces.find(a => a.textContent?.trim() === 'Documentación')!;
    const interno = enlaces.find(a => a.textContent?.trim() === 'Post')!;

    expect(externo.target).toBe('_blank');
    expect(externo.rel).toContain('noopener');
    expect(interno.target).toBe('');
    expect(interno.getAttribute('href')).toBe('/blog/angular/componentes');
  });

  it('aplica el color indicado en el JSON', async () => {
    await renderizar(glosarioMock());

    expect(el.querySelector('h3')?.classList).toContain('c-Angular');
  });

  it('filtra por letra con el índice A–Z y vuelve a todos al repetir la letra', async () => {
    await renderizar(glosarioMock());

    const botones = (): HTMLButtonElement[] => Array.from(el.querySelectorAll('nav button'));
    expect(botones().map(b => b.textContent?.trim()).slice(1)).toEqual(['C', 'I', 'S']);

    botones().find(b => b.textContent?.trim() === 'S')!.click();
    await renderizar();
    expect(titulos()).toEqual(['Señal']);
    expect(botones().find(b => b.textContent?.trim() === 'S')!.getAttribute('aria-pressed')).toBe('true');

    botones().find(b => b.textContent?.trim() === 'S')!.click();
    await renderizar();
    expect(titulos().length).toBe(3);
  });

  it('agrupa bajo # los términos que no empiezan por letra', async () => {
    await renderizar({ terms: [{ title: '404' }, { title: 'Ámbito' }] });

    expect(component.letras()).toEqual(['#', 'A']);
  });

  it('resalta la coincidencia de la búsqueda respetando el texto original', async () => {
    await renderizar(glosarioMock());
    await buscar('inyec');

    const marcas = Array.from(el.querySelectorAll('article mark')).map(m => m.textContent);
    expect(marcas).toEqual(['Inyec']);
    expect(titulos()).toEqual(['Inyección']);
  });

  it('asigna un ancla única a cada término, desde el id o el título', async () => {
    await renderizar({ terms: [{ id: 'Mi Id', title: 'Zeta' }, { title: 'Señal' }, { title: 'señal' }] });

    const anclas = Array.from(el.querySelectorAll('article')).map(a => a.id);
    expect(anclas).toEqual(['glosario-senal', 'glosario-senal-2', 'glosario-mi-id']);
  });

  it('trae a la vista el término indicado en el fragmento de la URL', async () => {
    await renderizar(glosarioMock());

    await TestBed.inject(Router).navigateByUrl('/#glosario-inyeccion');
    await renderizar();
    await renderizar();

    expect(component.busqueda()).toBe('Inyección');
    expect(titulos()).toEqual(['Inyección']);
  });

  it('usa las clases por defecto cuando el texto es una cadena', async () => {
    await renderizar(glosarioMock());

    const articulo = el.querySelector('article') as HTMLElement;
    expect(articulo.querySelector('h4')?.className).toContain('f-shadow-into-l');
    expect(articulo.querySelector('h4')?.className).toContain('c-Angular');
    expect(articulo.querySelector('p')?.className).toContain('glossary-text');
  });

  it('personaliza cada texto con TextModel: styleText sustituye las clases y url lo enlaza', async () => {
    await renderizar({
      title: { text: 'Mi glosario', styleText: 'titulo-propio' },
      color: 'c-Angular',
      terms: [{
        title: { text: 'Señal', styleText: 'f-yanone fs-40' },
        category: { text: 'Angular', styleText: 'categoria-propia' },
        updatedAt: { text: '2026-10-12', styleText: 'fecha-propia' },
        paragraphs: [
          { text: 'Con enlace', styleText: 'parrafo-propio', url: 'https://angular.dev', target: '_self' },
          'Sin personalizar'
        ],
        sections: [{
          titles: [{ text: 'Usos', styleText: 'seccion-propia' }],
          items: [{ text: 'Estado local', styleText: 'elemento-propio' }]
        }]
      }]
    });

    const articulo = el.querySelector('article') as HTMLElement;
    expect(el.querySelector('h3')?.className).toBe('titulo-propio');
    expect(el.querySelector('h3')?.textContent?.trim()).toBe('Mi glosario');
    expect(articulo.querySelector('h4')?.className).toBe('f-yanone fs-40');
    expect(titulos()).toEqual(['Señal']);
    expect(articulo.querySelector('.categoria-propia')?.textContent?.trim()).toBe('Angular');
    expect(articulo.querySelector('.fecha-propia time')?.getAttribute('datetime')).toBe('2026-10-12');
    expect(articulo.querySelector('.seccion-propia')?.textContent?.trim()).toBe('Usos');
    expect(articulo.querySelector('.elemento-propio')?.textContent).toContain('Estado local');

    const enlace = articulo.querySelector('.parrafo-propio a') as HTMLAnchorElement;
    expect(enlace.getAttribute('href')).toBe('https://angular.dev');
    expect(enlace.target).toBe('_self');
    expect(enlace.textContent).toBe('Con enlace');

    // el párrafo en cadena conserva las clases por defecto
    const parrafos = Array.from(articulo.querySelectorAll('p')).filter(p => p.textContent?.includes('Sin personalizar'));
    expect(parrafos[0].className).toContain('glossary-text');
  });

  it('busca, resalta, ordena y genera anclas también con textos en formato TextModel', async () => {
    await renderizar({
      terms: [
        { title: { text: 'Zeta' }, paragraphs: [{ text: 'Último término' }] },
        { title: { text: 'Árbol', styleText: 'x' } },
        { title: { text: '   ' } }
      ]
    });

    expect(titulos()).toEqual(['Árbol', 'Zeta']);
    expect(Array.from(el.querySelectorAll('article')).map(a => a.id)).toEqual(['glosario-arbol', 'glosario-zeta']);

    await buscar('ultimo');
    expect(titulos()).toEqual(['Zeta']);
    expect(Array.from(el.querySelectorAll('article mark')).map(m => m.textContent)).toEqual(['Último']);
  });

  it('se renderiza desde el JSON del post a través de DynamicContentComponent', async () => {
    const host = TestBed.createComponent(DynamicContentComponent);
    const bloque = { type: 'glossary', data: glosarioMock() };
    host.componentRef.setInput(
      'content',
      `<p>Intro</p><script type="application/json">${JSON.stringify(bloque)}</script>[ng-component]`
    );
    host.detectChanges();
    await host.whenStable();
    host.detectChanges();

    const encontrados = Array.from(host.nativeElement.querySelectorAll('app-glossary article h4') as NodeListOf<HTMLElement>)
      .map(h => h.textContent?.trim());
    expect(encontrados).toEqual(['Componente', 'Inyección', 'Señal']);
  });
});
