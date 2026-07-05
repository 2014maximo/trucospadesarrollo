import { posicionAleatoria, POSICIONES_INDICE } from './posicion.util';

describe('posicionAleatoria', () => {
  it('devuelve siempre un valor del set válido', () => {
    for (const seed of ['a', 'b', 'abc', 'instalacion', '/blog/angular/x', 'post-z', '']) {
      expect(POSICIONES_INDICE).toContain(posicionAleatoria(seed));
    }
  });

  it('es determinista: misma seed produce el mismo valor', () => {
    expect(posicionAleatoria('mi-post')).toBe(posicionAleatoria('mi-post'));
    expect(posicionAleatoria('otro-slug')).toBe(posicionAleatoria('otro-slug'));
  });

  it('cubrir más de un valor del set con varias semillas', () => {
    const resultados = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(s => posicionAleatoria(s)));
    expect(resultados.size).toBeGreaterThan(1);
  });
});