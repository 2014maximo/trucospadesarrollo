import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollAnimateDirective } from './scroll-animate.directive';

@Component({
  imports: [ScrollAnimateDirective],
  template: `<div [appScrollAnimate]="{ scaleX: [0, 1] }"></div>`
})
class HostComponent { }

describe('ScrollAnimateDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  function crear(reducirMovimiento: boolean): ScrollAnimateDirective {
    spyOn(window, 'matchMedia').and.returnValue({ matches: reducirMovimiento } as MediaQueryList);
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture.debugElement.children[0].injector.get(ScrollAnimateDirective);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
  });

  it('se suscribe al scroll y se desuscribe al destruirse', () => {
    const directiva = crear(false);
    const detener = jasmine.createSpy('detener');
    expect((directiva as any).detener).toBeDefined();
    (directiva as any).detener = detener;
    fixture.destroy();
    expect(detener).toHaveBeenCalled();
  });

  it('no se suscribe si el usuario prefiere movimiento reducido', () => {
    expect((crear(true) as any).detener).toBeUndefined();
  });
});
