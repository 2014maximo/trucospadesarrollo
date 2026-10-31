import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarqueeDirective } from './marquee.directive';

@Component({
  imports: [MarqueeDirective],
  template: `<div><ul appMarquee><li>Uno</li><li>Uno</li></ul></div>`
})
class HostComponent { }

describe('MarqueeDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  function crear(reducirMovimiento: boolean): MarqueeDirective {
    spyOn(window, 'matchMedia').and.returnValue({ matches: reducirMovimiento } as MediaQueryList);
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture.debugElement.query(el => el.name === 'ul').injector.get(MarqueeDirective);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
  });

  it('anima la pista en bucle y la detiene al destruirse', () => {
    const directiva = crear(false);
    const animacion = (directiva as any).animacion;
    expect(animacion).toBeDefined();
    spyOn(animacion, 'stop');
    fixture.destroy();
    expect(animacion.stop).toHaveBeenCalled();
  });

  it('se queda quieta y lo marca con una clase si el usuario prefiere movimiento reducido', () => {
    crear(true);
    const pista: HTMLElement = fixture.nativeElement.querySelector('ul');
    expect(pista.classList).toContain('marquee-estatico');
  });
});
