import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplitTextComponent } from './split-text.component';

describe('SplitTextComponent', () => {
  let fixture: ComponentFixture<SplitTextComponent>;

  function crear(texto: string, modo: 'letras' | 'palabras', oracion = false): HTMLElement {
    fixture = TestBed.createComponent(SplitTextComponent);
    fixture.componentRef.setInput('texto', texto);
    fixture.componentRef.setInput('modo', modo);
    fixture.componentRef.setInput('oracion', oracion);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SplitTextComponent] }).compileComponents();
  });

  it('divide en palabras y deja el texto completo para lectores de pantalla', () => {
    const host = crear('Hola mundo', 'palabras');
    expect(host.querySelectorAll('.st-u').length).toBe(2);
    expect(host.querySelector('.visually-hidden')?.textContent).toBe('Hola mundo');
  });

  it('divide en letras sin contar los espacios', () => {
    expect(crear('Alex Munoz', 'letras').querySelectorAll('.st-u').length).toBe(9);
  });

  it('convierte a tipo oración', () => {
    expect(crear('PRIMERA ERA', 'palabras', true).querySelector('.visually-hidden')?.textContent).toBe('Primera era');
  });
});
