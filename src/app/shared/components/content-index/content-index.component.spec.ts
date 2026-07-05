import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ContentIndexComponent } from './content-index.component';
import { posicionAleatoria } from '../../constants/functions/posicion.util';

const POSICIONES_VALIDAS = ['post-z', 'rot-1', 'rot-2', 'rot-3'];

describe('ContentIndexComponent', () => {
  let component: ContentIndexComponent;
  let fixture: ComponentFixture<ContentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentIndexComponent, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentIndexComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debe asignar una posición válida y determinista a todos los items', () => {
    component.indice = [
      { nombre: 'Post A', posicion: '', ruta: '/blog/angular/post-a', estado: 'activo', color: '', colorFondo: '' } as any,
      { nombre: 'Post B', posicion: 'rot-1', ruta: '/blog/angular/post-b', estado: 'activo', color: '', colorFondo: '' } as any,
    ];
    fixture.detectChanges();

    component.indice.forEach(i => expect(POSICIONES_VALIDAS).toContain(i.posicion));
    // Determinista: coincide con la función pura usando la misma semilla
    expect(component.indice[0].posicion).toBe(posicionAleatoria('/blog/angular/post-a'));
    expect(component.indice[1].posicion).toBe(posicionAleatoria('/blog/angular/post-b'));
  });

  it('debe sobrescribir la posicion explícita que traiga el item', () => {
    component.indice = [
      { nombre: 'Post A', posicion: 'rot-1', ruta: '/blog/angular/post-a', estado: 'activo', color: '', colorFondo: '' } as any,
    ];
    fixture.detectChanges();

    // Se sobrescribe siempre con el valor determinista derivado de la semilla
    expect(component.indice[0].posicion).toBe(posicionAleatoria('/blog/angular/post-a'));
  });

  it('debe sobrescribir incluso un valor explícito fuera del set válido', () => {
    component.indice = [
      { nombre: 'Post A', posicion: 'xxx', ruta: '/blog/angular/post-a', estado: 'activo', color: '', colorFondo: '' } as any,
    ];
    fixture.detectChanges();

    expect(POSICIONES_VALIDAS).toContain(component.indice[0].posicion);
    expect(component.indice[0].posicion).toBe(posicionAleatoria('/blog/angular/post-a'));
    expect(component.indice[0].posicion).not.toBe('xxx');
  });
});
