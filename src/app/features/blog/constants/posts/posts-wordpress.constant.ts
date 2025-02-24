import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_WORDPRESS: EstilosPost = {
    color: 'c-Wordpress',
    colorFondo: 'bg-Wordpress'
}

export const WORDPRESS: DatosPost[] = [
    {
        id: '66418d5a-10b3-47e4-8f6d-fe527c5c53af',
        nombre: 'WORDPRESS.wordpress.nombre',
        referenciaBusqueda:'WORDPRESS.wordpress.referenciaBusqueda',
        descripcion: ['WORDPRESS.wordpress.descripcion.tx1'],
        descripcionCorta: 'WORDPRESS.wordpress.descripcionCorta',
        ruta: 'wordpress',
        componente: 'WordpressComponent',
        categoria: 'wordpress',
        mostrarEnPostHome: false,
        estilos: ESTILO_WORDPRESS,
        fechaCreacion: '2020-09-15',
        fechaActualizacion: '',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-1',
        estado: 'inactivo'
    },
    {
        id: 'a4c97578-bdf9-46c3-a376-23b8814687ae',
        nombre: 'WORDPRESS.wordpress-elementos.nombre',
        referenciaBusqueda:'WORDPRESS.wordpress-elementos.referenciaBusqueda',
        descripcion: [
            'WORDPRESS.wordpress-elementos.descripcion.tx1'
        ],
        descripcionCorta: 'WORDPRESS.wordpress-elementos.descripcionCorta',
        ruta: 'wordpress-elementos',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_WORDPRESS,
        fechaCreacion: '2023-09-15',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-horizontal.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'wordpress',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    }
]