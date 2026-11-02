import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('enlaza el nombre del blog al dominio propio y muestra el año vigente', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('a.trucos')?.getAttribute('href')).toBe('https://www.trucospadesarrollo.com');
    expect(el.querySelector('p small')?.textContent).toContain('2 0 2 6');
  });

  it('no reserva columnas laterales: la alineación la decide quien lo usa', () => {
    expect(fixture.nativeElement.querySelector('.col-sm-1')).toBeNull();
  });
});
