import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevealDirective } from './reveal.directive';

@Component({
  imports: [RevealDirective],
  template: `<section appReveal [revealDistancia]="40">Contenido</section>`
})
class HostComponent { }

describe('RevealDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  function crear(reducirMovimiento: boolean): HTMLElement {
    spyOn(window, 'matchMedia').and.returnValue({ matches: reducirMovimiento } as MediaQueryList);
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('section');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    }).compileComponents();
  });

  it('oculta el elemento hasta que entra en pantalla', () => {
    const seccion = crear(false);
    expect(seccion.style.opacity).toBe('0');
  });

  it('no aplica estilos si el usuario prefiere movimiento reducido', () => {
    const seccion = crear(true);
    expect(seccion.style.opacity).toBe('');
  });

  it('calcula el desplazamiento según revealDesde', () => {
    crear(false);
    const directiva = fixture.debugElement.children[0].injector.get(RevealDirective);
    expect((directiva as any).desplazamiento()).toEqual({ y: [40, 0] });
    directiva.revealDesde = 'izquierda';
    expect((directiva as any).desplazamiento()).toEqual({ x: [-40, 0] });
    directiva.revealDesde = 'derecha';
    expect((directiva as any).desplazamiento()).toEqual({ x: [40, 0] });
  });

  it('desconecta el observador al destruirse', () => {
    crear(false);
    const directiva = fixture.debugElement.children[0].injector.get(RevealDirective);
    const detener = jasmine.createSpy('detener');
    (directiva as any).detenerObservador = detener;
    fixture.destroy();
    expect(detener).toHaveBeenCalled();
  });
});
