export class PostModel {
    id_post: string;
    nombre: string;
    categoria: string;
    ruta: string;
    rutaImagen: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    incluirFondo: boolean;
    sombra: string;
    alturaImagen: string;
    mostrarBreadcrumb: boolean;
    colorText: string;
    descripcion?: string;

    constructor(){
        this.id_post = '';
        this.nombre = '';
        this.categoria = '';
        this.ruta = '';
        this.rutaImagen = '';
        this.fechaCreacion = new Date();
        this.fechaActualizacion = new Date();
        this.incluirFondo = false;
        this.sombra = '';
        this.alturaImagen = '';
        this.mostrarBreadcrumb = true;
        this.colorText = '';
        this.descripcion = '';
    }
}

export class HeaderPostModel {
    
    rutaImagen: string;
    fondo: boolean;
    tituloPost: string;
    alturaImagen: string;
    sombra?: string;

    constructor(){
        this.rutaImagen = '';
        this.fondo = false;
        this.tituloPost = '';
        this.alturaImagen = '';
        this.sombra = '';
    }

}
export class ObjectAccordeonPostModel {
    dataParent: string = '';
    content: AccordeonPostModel [] = []
}
export class AccordeonPostModel {
    idHeading: string = '';
    contentHead: string = '';
    idCollapse: string = '';
    contendBody: string = '';
}

export class AccordeonModel {
    nClass: string;
    elemento: string = '';
    mostrarlo?: boolean;
    contenido?: string = '';
    contenidoLista?: ListaModel[];

    constructor(){
        this.nClass = '';
        this.elemento = '';
        this.mostrarlo = false;
        this.contenido = '';
        this.contenidoLista = []
    }
}

export class ListaModel {
    indice?: string = '';
    contenido: string = ''
}

export class CategoriaModel {
    activo: boolean = false;
    categoria: string = '';
    ruta: string = '';
    colorText: string = '';
    nClass?: string = '';
    icon?: string = '';
}

export interface SliderModel {
    ruta: string,
    alt: string,
    height: string,
    width: string,
    id: string,
    post?: string
}

export class AddsModel {
    contentIndex: boolean = false;
    roadMap: boolean = false;
    origin: boolean = false;
}