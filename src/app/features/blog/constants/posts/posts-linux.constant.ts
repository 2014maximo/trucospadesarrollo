import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_LINUX: EstilosPost = {
    color: 'c-Linux',
    colorFondo: 'bg-Linux'
}


export const LINUX: DatosPost[] = [
    {
        id: 'cb344e3e-8b47-4a86-8c26-c7f037ae239a',
        nombre: 'LINUX.linux.nombre',
        referenciaBusqueda:'LINUX.linux.referenciaBusqueda',
        descripcion: [
            'LINUX.linux.descripcion.tx1',
            'LINUX.linux.descripcion.tx2',
            'LINUX.linux.descripcion.tx3',
            'LINUX.linux.descripcion.tx4',
            'LINUX.linux.descripcion.tx5',
            'LINUX.linux.descripcion.tx6',
            'LINUX.linux.descripcion.tx7',
            'LINUX.linux.descripcion.tx8'
        ],
        descripcionCorta: 'LINUX.linux.descripcionCorta',
        ruta: 'linux',
        componente: 'LinuxComponent',
        categoria: 'linux',
        mostrarEnPostHome: false,
        estilos: ESTILO_LINUX,
        fechaCreacion: '2020-04-04',
        fechaActualizacion: '2020-04-04',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-1',
        estado: 'inactivo'
    },
    {
        id: 'c0d8a7db-934b-48a1-820c-d0d3c53d557c',
        nombre: 'LINUX.lx-comandos.nombre',
        referenciaBusqueda:'LINUX.lx-comandos.referenciaBusqueda',
        descripcion: [
            'LINUX.lx-comandos.descripcion.tx1'
        ],
        descripcionCorta: 'LINUX.lx-comandos.descripcionCorta',
        ruta: 'lx-co-m-u',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_LINUX,
        fechaCreacion: '2023-09-15',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-horizontal.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'linux',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    }
]