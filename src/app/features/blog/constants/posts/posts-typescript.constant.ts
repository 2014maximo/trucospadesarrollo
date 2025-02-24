import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"


export const ESTILO_TYPESCRIPT: EstilosPost = {
    color: 'c-Typescript',
    colorFondo: 'bg-Typescript'
}


export const TYPESCRIPT: DatosPost[] = [
    {
        id: '3574124706',
        nombre: 'TYPESCRIPT.typescript.nombre',
        referenciaBusqueda:'TYPESCRIPT.typescript.referenciaBusqueda',
        descripcion: [
            'TYPESCRIPT.typescript.descripcion.tx1',
            'TYPESCRIPT.typescript.descripcion.tx2',
            'TYPESCRIPT.typescript.descripcion.tx3'
        ],
        descripcionCorta: 'TYPESCRIPT.typescript.descripcionCorta',
        ruta: 'typescript',
        componente: 'TypescriptComponent',
        categoria: 'typescript',
        mostrarEnPostHome: false,
        estilos: ESTILO_TYPESCRIPT,
        fechaCreacion: '2023-09-06',
        fechaActualizacion: '',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-1',
        estado: 'inactivo'
    },
    {
        id: '21616adc-380c-412a-8f14-5d3bb6e9c520',
        nombre: 'TYPESCRIPT.typescript-elementos.nombre',
        referenciaBusqueda:'TYPESCRIPT.typescript-elementos.referenciaBusqueda',
        descripcion: [
            'TYPESCRIPT.typescript-elementos.descripcion.tx1'
        ],
        descripcionCorta: 'TYPESCRIPT.typescript-elementos.descripcionCorta',
        ruta: 'ts-elementos',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_TYPESCRIPT,
        fechaCreacion: '2023-09-06',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-horizontal.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'typescript',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    },
    {
        id: '81ae9c5f-2fb4-490e-bf10-7c7603fbeee8',
        nombre: 'TYPESCRIPT.typescript-instalacion.nombre',
        referenciaBusqueda:'TYPESCRIPT.typescript-instalacion.referenciaBusqueda',
        descripcion: [
            'TYPESCRIPT.typescript-instalacion.descripcion.tx1',
            'TYPESCRIPT.typescript-instalacion.descripcion.tx2',
            'TYPESCRIPT.typescript-instalacion.descripcion.tx3'
        ],
        descripcionCorta: 'TYPESCRIPT.typescript-instalacion.descripcionCorta',
        ruta: 'ts-instalacion',
        componente: '',
        mostrarEnPostHome: true,
        estilos: ESTILO_TYPESCRIPT,
        fechaCreacion: '2024-02-15',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/typescript/instalacion-typescript-poster.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'typescript',
        posicion: 'rot-2',
        estado: 'activo',
        imgSlider: undefined
    }
]
