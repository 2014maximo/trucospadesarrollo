import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_ELECTRON: EstilosPost = {
    color: 'c-Electron',
    colorFondo: 'bg-Electron'
}

export const ELECTRON: DatosPost[] = [
    {
        id: '1bbe7bbd-9f75-44da-8165-a5fde2070e2b',
        nombre: 'ELECTRON.electron.nombre',
        referenciaBusqueda:'ELECTRON.electron.referenciaBusqueda',
        descripcion: [
            'ELECTRON.electron.descripcion.tx1',
            'ELECTRON.electron.descripcion.tx2',
            'ELECTRON.electron.descripcion.tx3',
            'ELECTRON.electron.descripcion.tx4',
            'ELECTRON.electron.descripcion.tx5',
            'ELECTRON.electron.descripcion.tx6'
        ],
        descripcionCorta: 'ELECTRON.electron.descripcionCorta',
        ruta: 'electron',
        componente: 'ElectronComponent',
        mostrarEnPostHome: false,
        estilos: ESTILO_ELECTRON,
        fechaCreacion: '2020-08-02',
        fechaActualizacion: '2020-08-02',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'electron',
        posicion: 'rot-1',
        estado: 'inactivo'
    },
    {
        id: '456b48d2-6bd8-455f-b888-53adf98abb85',
        nombre: 'ELECTRON.etron-elementos.nombre',
        referenciaBusqueda:'ELECTRON.etron-elementos.referenciaBusqueda',
        descripcion: [
            'ELECTRON.etron-elementos.descripcion.tx1'
        ],
        descripcionCorta: 'ELECTRON.etron-elementos.descripcionCorta',
        ruta: 'etron-elementos',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_ELECTRON,
        fechaCreacion: '2023-09-14',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-horizontal.jpg'),
        imgVertical:'https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-cuadro.jpg',
        imgCuadro:'https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-cuadro.jpg',
        categoria: 'electron',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    },
    {
        id: '0b061731-9966-4aee-b6bd-d334fe6dc2a5',
        nombre: 'ELECTRON.etron-instalacion.nombre',
        referenciaBusqueda:'ELECTRON.etron-instalacion.referenciaBusqueda',
        descripcion: [
            'ELECTRON.etron-instalacion.descripcion.tx1'
        ],
        descripcionCorta: 'ELECTRON.etron-instalacion.descripcionCorta',
        ruta: 'etron-instalacion',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_ELECTRON,
        fechaCreacion: '2023-09-14',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-horizontal.jpg'),
        imgVertical:'https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-cuadro.jpg',
        imgCuadro:'https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-cuadro.jpg',
        categoria: 'electron',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    },
]