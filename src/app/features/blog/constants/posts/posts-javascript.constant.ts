import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_JAVASCRIPT: EstilosPost = {
    color: 'c-Javascript',
    colorFondo: 'bg-Javascript'
}


export const JAVASCRIPT: DatosPost[] = [
    {
        id: '57a97a47-cc14-4db5-9f76-bd8a226016f5',
        nombre: 'JAVASCRIPT.javascript.nombre',
        referenciaBusqueda:'JAVASCRIPT.javascript.referenciaBusqueda',
        descripcion: [
            'JAVASCRIPT.javascript.descripcion.tx1',
            'JAVASCRIPT.javascript.descripcion.tx2',
            'JAVASCRIPT.javascript.descripcion.tx3',
            'JAVASCRIPT.javascript.descripcion.tx4',
            'JAVASCRIPT.javascript.descripcion.tx5',
            'JAVASCRIPT.javascript.descripcion.tx6',
            'JAVASCRIPT.javascript.descripcion.tx7',
            'JAVASCRIPT.javascript.descripcion.tx8',
            'JAVASCRIPT.javascript.descripcion.tx9',
            'JAVASCRIPT.javascript.descripcion.tx10',
            'JAVASCRIPT.javascript.descripcion.tx11'
        ],
        descripcionCorta: 'JAVASCRIPT.javascript.descripcionCorta',
        ruta: 'javascript',
        componente: 'JavascriptComponent',
        categoria: 'javascript',
        mostrarEnPostHome: false,
        estilos: ESTILO_JAVASCRIPT,
        fechaCreacion: '2020-04-04',
        fechaActualizacion: '2020-04-04',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-1',
        estado: 'inactivo'
    },
    {
        id: 'c79624d0-b839-465a-9879-461267c01f6b',
        nombre: 'JAVASCRIPT.js-elementos.nombre',
        referenciaBusqueda:'JAVASCRIPT.js-elementos.referenciaBusqueda',
        descripcion: [
            'JAVASCRIPT.js-elementos.descripcion.tx1'
        ],
        descripcionCorta: 'JAVASCRIPT.js-elementos.descripcionCorta',
        ruta: 'js-elementos',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_JAVASCRIPT,
        fechaCreacion: '2023-09-06',
        fechaActualizacion: '2023-09-14',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/javascript/elementos-javascript.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'javascript',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    },
    {
        id: 'bd16e1f4-b3dd-45d6-8400-c9e0a5ced350',
        nombre: 'JAVASCRIPT.js-recorrer-arrays-objetos.nombre',
        referenciaBusqueda:'JAVASCRIPT.js-recorrer-arrays-objetos.referenciaBusqueda',
        descripcion: [
            'JAVASCRIPT.js-recorrer-arrays-objetos.descripcion.tx1'
        ],
        descripcionCorta: 'JAVASCRIPT.js-recorrer-arrays-objetos.descripcionCorta',
        ruta: 'js-recorrer-arrays-objetos',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_JAVASCRIPT,
        fechaCreacion: '2023-09-06',
        fechaActualizacion: '2023-09-14',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/javascript/recorrido-arrays.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'javascript',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    },
]