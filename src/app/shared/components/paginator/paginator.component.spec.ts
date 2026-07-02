import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no debe calcular páginas si el contenedor está vacío', () => {
    expect(component.totalPaginas().length).toBe(0);
  });

  it('debe calcular páginas correctamente con 10 items y 3 por página', () => {
    const items = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
    component.contenedor = items;
    component.itemIniciales = 3;
    component.ngOnInit();

    expect(component.totalPaginas().length).toBe(4);
    expect(component.totalPaginas()[0].contenido.length).toBe(3);
    expect(component.totalPaginas()[1].contenido.length).toBe(3);
    expect(component.totalPaginas()[2].contenido.length).toBe(3);
    expect(component.totalPaginas()[3].contenido.length).toBe(1);
  });

  it('debe calcular páginas correctamente con 21 items y 9 por página', () => {
    const items = Array.from({ length: 21 }, (_, i) => ({ id: i + 1 }));
    component.contenedor = items;
    component.itemIniciales = 9;
    component.ngOnInit();

    expect(component.totalPaginas().length).toBe(3);
    expect(component.totalPaginas()[0].contenido.length).toBe(9);
    expect(component.totalPaginas()[1].contenido.length).toBe(9);
    expect(component.totalPaginas()[2].contenido.length).toBe(3);
  });

  it('no debe haber duplicados entre páginas', () => {
    const items = Array.from({ length: 21 }, (_, i) => ({ id: i + 1 }));
    component.contenedor = items;
    component.itemIniciales = 9;
    component.ngOnInit();

    const todosLosIds = component.totalPaginas().flatMap(p => p.contenido.map((item: any) => item.id));
    const idsUnicos = new Set(todosLosIds);
    expect(todosLosIds.length).toBe(idsUnicos.size);
    expect(todosLosIds.length).toBe(21);
  });

  it('debe emitir la página solicitada al llamar cargarPagina', async () => {
    const items = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
    component.contenedor = items;
    component.itemIniciales = 3;
    component.ngOnInit();

    let paginaEmitida: any[] = [];
    component.paginados.subscribe((p: any[]) => paginaEmitida = p);

    component.cargarPagina(2);
    await Promise.resolve();
    expect(paginaEmitida?.length).toBe(3);
    expect(paginaEmitida.map((item: any) => item.id)).toEqual([7, 8, 9]);
    expect(component.active()).toBe('2');
  });

  it('debe usar itemsMobile cuando el viewport es pequeño', () => {
    const items = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
    component.contenedor = items;
    component.itemIniciales = 9;
    component.itemsMobile = 3;
    component.ngOnInit();

    expect(component.totalPaginas().length).toBe(4);
    expect(component.totalPaginas()[0].contenido.length).toBe(3);
  });

  it('el active inicial debe ser la primera página (índice 0)', () => {
    expect(component.active()).toBe('0');
  });

  it('tras ngOnInit el active debe seguir siendo la primera página visible', () => {
    const items = Array.from({ length: 21 }, (_, i) => ({ id: i + 1 }));
    component.contenedor = items;
    component.itemIniciales = 9;
    component.ngOnInit();

    expect(component.active()).toBe('0');
  });
});
