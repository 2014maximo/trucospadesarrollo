/** Posiciones visuales disponibles para los items de un índice. */
export const POSICIONES_INDICE: readonly string[] = ['post-z', 'rot-1', 'rot-2', 'rot-3'];

/**
 * Devuelve una posición del set {@link POSICIONES_INDICE} de forma **determinista**
 * a partir de `seed`. Es estable entre server y client (SSR-safe): la misma
 * semilla produce siempre el mismo valor, evitando mismatch de hidratación.
 *
 * Útil para asignar rotaciones/z-index aleatorios pero estables por item,
 * reutilizable desde cualquier componente.
 */
export function posicionAleatoria(seed: string): string {
  let h = 0;
  const s = seed ?? '';
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(h) % POSICIONES_INDICE.length;
  return POSICIONES_INDICE[idx];
}