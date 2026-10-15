import { GlossaryLinkModel } from './glossary.model';
import { ImageAdapterModel } from './image-adapter.model';

/**
 * Modelos de vista de `GlossaryComponent`: lo que la plantilla pinta una vez resuelto el JSON
 * (`GlossaryModel`). No forman parte del contrato que se envía desde WordPress.
 */

/** Texto ya resuelto para la plantilla: contenido, clases finales y enlace opcional. */
export interface TextoVista {
  text: string;
  clase: string;
  url: string;
  target: string;
}

export interface SeccionVista {
  titulos: TextoVista[];
  elementos: TextoVista[];
}

export interface TerminoVista {
  titulo: TextoVista;
  categoria: TextoVista | null;
  fecha: TextoVista | null;
  parrafos: TextoVista[];
  secciones: SeccionVista[];
  links: GlossaryLinkModel[];
  /** `id` del elemento, para enlazar el término con `#ancla`. */
  ancla: string;
  /** Inicial para el índice A–Z; `#` si no empieza por letra. */
  letra: string;
  imagen: ImageAdapterModel | null;
  texto: string;
}
