import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_FLUTTER: EstilosPost = {
    color: 'c-Flutter',
    colorFondo: 'bg-Flutter'
}

export const FLUTTER: DatosPost[] = [
    {
        id: '9249441409',
        nombre: 'FLUTTER.flutter.nombre',
        referenciaBusqueda:'FLUTTER.flutter.referenciaBusqueda',
        descripcion: [
            'FLUTTER.flutter.descripcion.tx1',
            'FLUTTER.flutter.descripcion.tx2',
            'FLUTTER.flutter.descripcion.tx3',
            'FLUTTER.flutter.descripcion.tx4',
            'FLUTTER.flutter.descripcion.tx5'
        ],
        descripcionCorta: 'FLUTTER.flutter.descripcionCorta',
        ruta: 'flutter',
        componente: 'FlutterComponent',
        mostrarEnPostHome: false,
        estilos: ESTILO_FLUTTER,
        fechaCreacion: '2022-04-08',
        fechaActualizacion: '2022-04-08',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'flutter',
        posicion: 'rot-1',
        estado: 'inactivo'
    },
    {
        id: '70d34b42-d1bf-4920-b217-ef6b09ff42d6',
        nombre: 'FLUTTER.flutter-instalacion.nombre',
        referenciaBusqueda:'FLUTTER.flutter-instalacion.referenciaBusqueda',
        descripcion: [
            'FLUTTER.flutter-instalacion.descripcion.tx1'
        ],
        descripcionCorta: 'FLUTTER.flutter-instalacion.descripcionCorta',
        ruta: 'flutter-instalacion',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_FLUTTER,
        fechaCreacion: '2023-09-14',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-horizontal.jpg'),
        imgVertical:'https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-cuadro.jpg',
        imgCuadro:'https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-cuadro.jpg',
        categoria: 'flutter',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    },
    {
        id: '73913100-7f71-49a2-8e8e-b25464880ea7',
        nombre: 'FLUTTER.flutter-elementos.nombre',
        referenciaBusqueda:'FLUTTER.flutter-elementos.referenciaBusqueda',
        descripcion: [
            'FLUTTER.flutter-elementos.descripcion.tx1'
        ],
        descripcionCorta: 'FLUTTER.flutter-elementos.descripcionCorta',
        ruta: 'flutter-elementos',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_FLUTTER,
        fechaCreacion: '2023-09-14',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-horizontal.jpg'),
        imgVertical:'https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-cuadro.jpg',
        imgCuadro:'https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-cuadro.jpg',
        categoria: 'flutter',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    }
]