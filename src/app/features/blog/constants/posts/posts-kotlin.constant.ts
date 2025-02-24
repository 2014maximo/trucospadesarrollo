import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_KOTLIN: EstilosPost = {
    color: 'c-Kotlin',
    colorFondo: 'bg-Kotlin'
}


export const KOTLIN: DatosPost[] = [
    {
        id: 'd8b1f94e-7b7e-41c1-a6d7-151e251c2889',
        nombre: 'KOTLIN.kotlin.nombre',
        referenciaBusqueda:'KOTLIN.kotlin.referenciaBusqueda',
        descripcion: [
            'KOTLIN.kotlin.descripcion.tx1',
            'KOTLIN.kotlin.descripcion.tx2',
            'KOTLIN.kotlin.descripcion.tx3',
            'KOTLIN.kotlin.descripcion.tx4',
            'KOTLIN.kotlin.descripcion.tx5',
            'KOTLIN.kotlin.descripcion.tx6',
            'KOTLIN.kotlin.descripcion.tx7',
            'KOTLIN.kotlin.descripcion.tx8'
        ],
        descripcionCorta: 'KOTLIN.kotlin.descripcionCorta',
        ruta: 'kotlin',
        componente: 'KotlinComponent',
        categoria: 'kotlin',
        mostrarEnPostHome: false,
        estilos: ESTILO_KOTLIN,
        fechaCreacion: '2020-09-15',
        fechaActualizacion: '',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-1',
        estado: 'inactivo'
    },
    {
        id: '4310addc-5bed-49b2-9d60-76a1c58b1881',
        nombre: 'KOTLIN.kotlin-elementos.nombre',
        referenciaBusqueda:'KOTLIN.kotlin-elementos.referenciaBusqueda',
        descripcion: [
            'KOTLIN.kotlin-elementos.descripcion.tx1'
        ],
        descripcionCorta: 'KOTLIN.kotlin-elementos.descripcionCorta',
        ruta: 'kotlin-elementos',
        componente: '',
        mostrarEnPostHome: true,
        estilos: ESTILO_KOTLIN,
        fechaCreacion: '2024-05-08',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/kotlin/elementos-kotlin.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'kotlin',
        posicion: 'rot-2',
        estado: 'activo'
    }
]