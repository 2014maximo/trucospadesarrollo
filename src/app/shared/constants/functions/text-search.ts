export interface TextSegment {
  text: string;
  match: boolean;
}

/** Minúsculas y sin diacríticos, para comparar sin importar tildes ni mayúsculas. */
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** Parte `texto` en tramos marcando los que coinciden con `consulta` (sin distinguir tildes ni mayúsculas). */
export function segmentarCoincidencias(texto: string, consulta: string): TextSegment[] {
  const buscada = normalizar((consulta ?? '').trim());
  if (!texto || !buscada) {
    return [{ text: texto ?? '', match: false }];
  }

  // Texto normalizado + posición de cada carácter normalizado en el original.
  let normalizado = '';
  const origen: number[] = [];
  for (let i = 0; i < texto.length; i++) {
    for (const caracter of normalizar(texto[i])) {
      normalizado += caracter;
      origen.push(i);
    }
  }

  const tramos: TextSegment[] = [];
  let cursor = 0;
  let posicion = normalizado.indexOf(buscada);
  while (posicion !== -1) {
    const inicio = origen[posicion];
    const fin = origen[posicion + buscada.length - 1] + 1;
    if (inicio > cursor) {
      tramos.push({ text: texto.slice(cursor, inicio), match: false });
    }
    tramos.push({ text: texto.slice(inicio, fin), match: true });
    cursor = fin;
    posicion = normalizado.indexOf(buscada, posicion + buscada.length);
  }
  if (cursor < texto.length) {
    tramos.push({ text: texto.slice(cursor), match: false });
  }
  return tramos;
}
