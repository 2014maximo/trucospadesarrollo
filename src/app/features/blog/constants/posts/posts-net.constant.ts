import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_NET: EstilosPost = {
    color: 'c-Net',
    colorFondo: 'bg-Net'
}

export const NET: DatosPost[] = [
    {
        id: 'a51c1552-365b-4012-9afd-28637fe5c1d7',
        nombre: 'NET.net.nombre',
        referenciaBusqueda:'NET.net.referenciaBusqueda',
        descripcion: [
            'NET.net.descripcion.tx1',
            'NET.net.descripcion.tx2',
            'NET.net.descripcion.tx3',
            'NET.net.descripcion.tx4',
            'NET.net.descripcion.tx5',
            'NET.net.descripcion.tx6'
        ],
        descripcionCorta: 'NET.net.descripcionCorta',
        ruta: 'net',
        componente: 'NetComponent',
        categoria: 'net',
        mostrarEnPostHome: false,
        estilos: ESTILO_NET,
        fechaCreacion: '2020-09-15',
        fechaActualizacion: '',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-1',
        estado: 'inactivo'
    },
    {
        id: '23ef844e-de15-49b8-bda3-aded4000630e',
        nombre: 'NET.net-elementos.nombre',
        referenciaBusqueda:'NET.net-elementos.referenciaBusqueda',
        descripcion: [
            'NET.net-elementos.descripcion.tx1'
        ],
        descripcionCorta: 'NET.net-elementos.descripcionCorta',
        ruta: 'net-elementos',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_NET,
        fechaCreacion: '2023-09-15',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-horizontal.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'net',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    },
    {
        id: 'e0fd17aa-bb97-4bec-901a-a6d4e0e4eba2',
        nombre: 'NET.net-instalacion.nombre',
        referenciaBusqueda:'NET.net-instalacion.referenciaBusqueda',
        descripcion: [
            'NET.net-instalacion.descripcion.tx1'
        ],
        descripcionCorta: 'NET.net-instalacion.descripcionCorta',
        ruta: 'net-instalacion',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_NET,
        fechaCreacion: '2023-09-15',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-horizontal.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'net',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    }
]