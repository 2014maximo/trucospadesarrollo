import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_HTML: EstilosPost = {
    color: 'c-Html',
    colorFondo: 'bg-Html'
}

export const HTML: DatosPost[] = [
    {
        id: '8825362007',
        nombre: 'HTML.html.nombre',
        referenciaBusqueda:'HTML.html.referenciaBusqueda',
        descripcion: [
            'HTML.html.descripcion.tx1',
            'HTML.html.descripcion.tx2',
            'HTML.html.descripcion.tx3',
            'HTML.html.descripcion.tx4',
            'HTML.html.descripcion.tx5',
            'HTML.html.descripcion.tx6',
            'HTML.html.descripcion.tx7',
            'HTML.html.descripcion.tx8',
            'HTML.html.descripcion.tx9',
            'HTML.html.descripcion.tx10',
            'HTML.html.descripcion.tx11'
        ],
        descripcionCorta: 'HTML.html.descripcionCorta',
        ruta: 'html',
        componente: 'HtmlComponent',
        categoria: 'html',
        mostrarEnPostHome: false,
        estilos: ESTILO_HTML,
        fechaCreacion: '2021-09-09',
        fechaActualizacion: '2021-09-09',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-1',
        estado: 'inactivo'
    },
    {
        id: '4ca90899-3cfc-455d-a4e3-9b529d80e06f',
        nombre: 'HTML.html-elementos.nombre',
        referenciaBusqueda:'HTML.html-elementos.referenciaBusqueda',
        descripcion: [
            'HTML.html-elementos.descripcion.tx1'
        ],
        descripcionCorta: 'HTML.html-elementos.descripcionCorta',
        ruta: 'html-elementos',
        componente: '',
        mostrarEnPostHome: true,
        estilos: ESTILO_HTML,
        fechaCreacion: '2023-09-14',
        fechaActualizacion: '2024-06-10',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/html/etiquetas-html.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'html',
        posicion: 'rot-2',
        estado: 'activo',
        imgSlider: undefined
    }
]