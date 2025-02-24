import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_DART: EstilosPost = {
    color: 'c-Dart',
    colorFondo: 'bg-Dart'
}

export const DART: DatosPost[] = [
    {
        id: '2288525419',
        nombre: 'DART.dart.nombre',
        referenciaBusqueda:'DART.dart.referenciaBusqueda',
        descripcion: [
            'DART.dart.descripcion.tx1',
            'DART.dart.descripcion.tx2',
            'DART.dart.descripcion.tx3',
            'DART.dart.descripcion.tx4',
            'DART.dart.descripcion.tx5',
            'DART.dart.descripcion.tx6'],
        descripcionCorta: 'DART.dart.descripcionCorta',
        ruta: '',
        componente: '',
        categoria: 'dart',
        mostrarEnPostHome: false,
        estilos: ESTILO_DART,
        fechaCreacion: '2021-02-02',
        fechaActualizacion: '2022-10-02',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-2',
        estado: 'inactivo'
    },
    {
        id: 'abca9c03-f685-47df-aa15-8c52051955c2',
        nombre: 'DART.dart-elementos.nombre',
        referenciaBusqueda:'DART.dart-elementos.referenciaBusqueda',
        descripcion: [
            'DART.dart-elementos.descripcion.tx1'
        ],
        descripcionCorta: 'DART.dart-elementos.descripcionCorta',
        ruta: 'dart-elementos',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_DART,
        fechaCreacion: '2023-09-11',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/dart/elementos-dart2.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'dart',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: {
            alt: 'Elementos dart',
            height: '600',
            id: '2',
            ruta: 'https://plantillas_dev.gitlab.io/assets/img/posts/dart/elementos-dartSlider.webp',
            width: 'auto',
            post: 'dart-elementos'
        }
    }
]