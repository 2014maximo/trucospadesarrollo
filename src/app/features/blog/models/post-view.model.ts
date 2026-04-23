/** Modelo de vista listo para enlazar en `PostBaseComponent`. */

export interface PostViewModel {
  id: string;
  slug: string;
  titulo: string;
  contenidoHtml: string;
  resumenHtml: string;
  fechaPublicacion: string;
  fechaModificacion: string;
  nombreAutor: string;
}
