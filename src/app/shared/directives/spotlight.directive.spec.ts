import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpotlightDirective } from './spotlight.directive';

@Component({
  imports: [SpotlightDirective],
  template: `<div appSpotlight style="position: fixed; left: 10px; top: 20px; width: 100px; height: 100px"></div>`
})
class HostComponent { }

describe('SpotlightDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('expone la posición del puntero relativa al elemento', () => {
    const elemento: HTMLElement = fixture.nativeElement.querySelector('div');
    elemento.dispatchEvent(new PointerEvent('pointermove', { clientX: 40, clientY: 70 }));
    expect(elemento.style.getPropertyValue('--mx')).toBe('30px');
    expect(elemento.style.getPropertyValue('--my')).toBe('50px');
  });
});
