/** Modelo de vista listo para enlazar en `PostBaseComponent`. */
export interface PostViewModel {
  id: string;
  slug: string;
  titulo: string;
  contenidoHtml: string;
  resumenHtml: string;
  fechaPublicacion: string;
  fechaModificacion: string;
  categoria: string;
  /** Nombre legible de la categoría (ej: "Developer") para construir la ruta del ícono */
  categoriaNombre: string;
}
