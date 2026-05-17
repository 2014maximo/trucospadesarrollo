/** Modelo de vista listo para enlazar en `CategoryBaseComponent`. */
export interface CategoryViewModel {
  /** ID interno de WordPress. */
  id: string;
  /** Slug de la página (coincide con el nombre de la categoría en la URL). */
  slug: string;
  /** Título de la página en texto plano. */
  titulo: string;
  /** Cuerpo HTML de la página tal como lo devuelve WordPress. */
  contenidoHtml: string;
}
