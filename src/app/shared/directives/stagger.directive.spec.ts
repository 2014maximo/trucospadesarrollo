import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaggerDirective } from './stagger.directive';

@Component({
  imports: [StaggerDirective],
  template: `<ul appStagger><li>Uno</li><li>Dos</li></ul>`
})
class HostComponent { }

describe('StaggerDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  function crear(reducirMovimiento: boolean): HTMLElement[] {
    spyOn(window, 'matchMedia').and.returnValue({ matches: reducirMovimiento } as MediaQueryList);
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return Array.from(fixture.nativeElement.querySelectorAll('li'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
  });

  it('oculta los hijos hasta que el contenedor entra en pantalla', () => {
    crear(false).forEach(hijo => expect(hijo.style.opacity).toBe('0'));
  });

  it('no toca los hijos si el usuario prefiere movimiento reducido', () => {
    crear(true).forEach(hijo => expect(hijo.style.opacity).toBe(''));
  });
});
