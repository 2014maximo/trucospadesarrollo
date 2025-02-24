import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_KUBERNETES: EstilosPost = {
    color: 'c-Kubernetes',
    colorFondo: 'bg-Kubernetes'
}


export const KUBERNETES: DatosPost[] = [
    {
        id: 'b4b3eae9-5f63-4d8e-851b-57bb6982a919',
        nombre: 'KUBERNETES.kubernetes.nombre',
        referenciaBusqueda:'KUBERNETES.kubernetes.referenciaBusqueda',
        descripcion: [
            'KUBERNETES.kubernetes.descripcion.tx1',
            'KUBERNETES.kubernetes.descripcion.tx2',
            'KUBERNETES.kubernetes.descripcion.tx3',
            'KUBERNETES.kubernetes.descripcion.tx4',
            'KUBERNETES.kubernetes.descripcion.tx5',
            'KUBERNETES.kubernetes.descripcion.tx6'
        ],
        descripcionCorta: 'KUBERNETES.kubernetes.descripcionCorta',
        ruta: 'kotlin',
        componente: 'KotlinComponent',
        categoria: 'kotlin',
        mostrarEnPostHome: false,
        estilos: ESTILO_KUBERNETES,
        fechaCreacion: '2020-09-15',
        fechaActualizacion: '',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-1',
        estado: 'inactivo'
    },
    {
        id: 'f69f7a4b-7bd3-4adb-a4f4-1e0c4d997e5a',
        nombre: 'KUBERNETES.kubernetes-elementos.nombre',
        referenciaBusqueda:'KUBERNETES.kubernetes-elementos.referenciaBusqueda',
        descripcion: [
            'KUBERNETES.kubernetes-elementos.descripcion.tx1'
        ],
        descripcionCorta: 'KUBERNETES.kubernetes-elementos.descripcionCorta',
        ruta: 'kotlin-elementos',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_KUBERNETES,
        fechaCreacion: '2023-09-15',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/angular/instalacion-angular-horizontal.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'kotlin',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    }
]