import { TextModel } from './block-content.model';
import { ImageAdapterModel } from './image-adapter.model';

/**
 * Texto del glosario: una cadena (estilos por defecto) o un `TextModel` para personalizarlo.
 * A diferencia de `block-content`, `text` se pinta como texto plano (sin HTML) para poder resaltar la búsqueda.
 */
export type GlossaryText = string | TextModel;

export class GlossaryModel {
    /** Encabezado: texto o clave i18n. Por defecto, la clave `Glosario`. */
    title?: GlossaryText = '';
    /** Clase CSS de color para encabezado, buscador, índice y títulos (p. ej. `c-Angular`). */
    color?: string = '';
    itemsPerPage?: number = 30;
    itemsMobile?: number = 10;
    terms: GlossaryTermModel[] = [];
}

export class GlossaryTermModel {
    /** Identificador para el ancla del término (`#glosario-<id>`). Si falta, se deriva del título. */
    id?: string = '';
    title: GlossaryText = '';
    category?: GlossaryText = '';
    updatedAt?: GlossaryText = '';
    paragraphs?: GlossaryText[] = [];
    sections?: GlossarySectionModel[] = [];
    /** Imagen descriptiva; se muestra en el lado opuesto al texto. */
    image?: Partial<ImageAdapterModel>;
    links?: GlossaryLinkModel[] = [];
}

export class GlossarySectionModel {
    titles?: GlossaryText[] = [];
    items?: GlossaryText[] = [];
}

export class GlossaryLinkModel {
    title?: string = '';
    /** `http(s)://...` abre en otra pestaña; cualquier otro valor se trata como ruta interna. */
    url: string = '';
}
