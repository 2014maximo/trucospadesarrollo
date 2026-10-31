import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountUpDirective } from './count-up.directive';

@Component({
  imports: [CountUpDirective],
  template: `<span [appCountUp]="12" countUpSufijo="+"></span>`
})
class HostComponent { }

describe('CountUpDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  function crear(reducirMovimiento: boolean): HTMLElement {
    spyOn(window, 'matchMedia').and.returnValue({ matches: reducirMovimiento } as MediaQueryList);
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('span');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
  });

  it('empieza en 0 para contar al entrar en pantalla', () => {
    expect(crear(false).textContent).toBe('0+');
  });

  it('muestra el valor final si el usuario prefiere movimiento reducido', () => {
    expect(crear(true).textContent).toBe('12+');
  });
});
