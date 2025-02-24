import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_REACT: EstilosPost = {
    color: 'c-React',
    colorFondo: 'bg-React'
}

export const REACT: DatosPost[] = [
    {
        id: '62a96ee3-75c7-4b01-aba7-d963ffd140bb',
        nombre: 'REACT.react.nombre',
        referenciaBusqueda:'REACT.react.referenciaBusqueda',
        descripcion: [
            'REACT.react.descripcion.tx1',
            'REACT.react.descripcion.tx2',
            'REACT.react.descripcion.tx3',
            'REACT.react.descripcion.tx4',
            'REACT.react.descripcion.tx5'

        ],
        descripcionCorta: 'REACT.react.descripcionCorta',
        ruta: 'react',
        componente: 'ReactComponent',
        categoria: 'react',
        mostrarEnPostHome: false,
        estilos: ESTILO_REACT,
        fechaCreacion: '2020-09-15',
        fechaActualizacion: '',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-1',
        estado: 'inactivo'
    },
    {
        id: 'ed1ead34-09ca-4de2-b43d-ecf6f60a9e39',
        nombre: 'REACT.react-elementos.nombre',
        referenciaBusqueda:'REACT.react-elementos.referenciaBusqueda',
        descripcion: [
            'REACT.react-elementos.descripcion.tx1'
        ],
        descripcionCorta: 'REACT.react-elementos.descripcionCorta',
        ruta: 'react-elementos',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_REACT,
        fechaCreacion: '2023-09-15',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-horizontal.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'react',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    }
]