import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordRotatorComponent } from './word-rotator.component';

describe('WordRotatorComponent', () => {
  let fixture: ComponentFixture<WordRotatorComponent>;

  function crear(reducirMovimiento: boolean): HTMLElement {
    spyOn(window, 'matchMedia').and.returnValue({ matches: reducirMovimiento } as MediaQueryList);
    fixture = TestBed.createComponent(WordRotatorComponent);
    fixture.componentRef.setInput('palabras', ['ANGULAR', 'IONIC', 'DESARROLLO']);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('.wr-palabra');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [WordRotatorComponent] }).compileComponents();
  });

  it('muestra la palabra final antes de empezar (y en servidor)', () => {
    expect(crear(false).textContent).toBe('DESARROLLO');
  });

  it('con movimiento reducido no rota y se queda en la palabra final', async () => {
    const palabra = crear(true);
    await new Promise(r => setTimeout(r, 300));
    expect(palabra.textContent).toBe('DESARROLLO');
  });

  it('recorre todas las palabras y termina en la última', async () => {
    const palabra = crear(false);
    fixture.componentRef.setInput('pausa', 0.01);
    const vistas = new Set<string>();
    const observador = new MutationObserver(() => vistas.add(palabra.textContent ?? ''));
    observador.observe(palabra, { childList: true, characterData: true, subtree: true });
    await (fixture.componentInstance as any).reproducir();
    observador.disconnect();
    expect([...vistas]).toEqual(['ANGULAR', 'IONIC', 'DESARROLLO']);
  });
});
