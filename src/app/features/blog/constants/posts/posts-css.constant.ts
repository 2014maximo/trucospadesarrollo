import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_CSS: EstilosPost = {
    color: 'c-Css',
    colorFondo: 'bg-Css'
}

export const CSS: DatosPost[] = [
    {
        id: '2234145591',
        nombre: 'CSS.css.nombre',
        referenciaBusqueda:'CSS.css.referenciaBusqueda',
        descripcion: [
            'CSS.css.descripcion.tx1',
            'CSS.css.descripcion.tx2',
            'CSS.css.descripcion.tx3',
            'CSS.css.descripcion.tx4'],
        descripcionCorta: 'CSS.css.descripcionCorta',
        ruta: 'css',
        componente: 'CssComponent',
        categoria: 'css',
        mostrarEnPostHome: false,
        estilos: ESTILO_CSS,
        fechaCreacion: '2021-01-01',
        fechaActualizacion: '2021-01-01',
        imgHorizontal:new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-2',
        estado: 'inactivo'
    },
    {
        id: 'ffee0fb8-9e0d-49f2-80ac-afdcf115f92f',
        nombre: 'CSS.css-clases.nombre',
        referenciaBusqueda:'CSS.css-clases.referenciaBusqueda',
        descripcion: [
            'CSS.css-clases.descripcion.tx1'
        ],
        descripcionCorta: 'CSS.css-clases.descripcionCorta',
        ruta: 'css-atributos',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_CSS,
        fechaCreacion: '2023-09-14',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/css/elementos.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'css',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    },
    {
        id: '62161a6b-c446-4756-8cde-c98e7894934b',
        nombre: 'Elementos CSS',
        referenciaBusqueda:'clases css, estilos css, css, elementos',
        descripcion: [
            'Descripción detallada de las clases y ejemplos'
        ],
        descripcionCorta: 'Descripción detallada de cada una de las propiedades que permiten los estilos en la web.',
        ruta: 'css-elementos',
        componente: '',
        mostrarEnPostHome: true,
        estilos: ESTILO_CSS,
        fechaCreacion: '2023-09-14',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/css/elementos.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'css',
        posicion: 'rot-2',
        estado: 'activo',
        imgSlider: undefined
    },
]