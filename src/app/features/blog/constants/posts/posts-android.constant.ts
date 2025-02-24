import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_ANDROID: EstilosPost = {
    color: 'c-Android',
    colorFondo: 'bg-Android'
}


export const ANDROID: DatosPost[] = [
    {
        id: '2a988b8d-2e63-48b5-baf4-767ddcf5f747',
        nombre: 'ANDROID.android.nombre',
        referenciaBusqueda:'ANDROID.android.referenciaBusqueda',
        descripcion: ['ANDROID.android.descripcion.tx1'],
        descripcionCorta: 'ANDROID.android.descripcionCorta',
        ruta: 'android',
        componente: 'AndroidComponent',
        categoria: 'android',
        imgCuadro:'',
        posicion: 'rot-2',
        imgHorizontal: new RefImg(),
        imgVertical: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_ANDROID,
        fechaCreacion: '2021-04-02',
        fechaActualizacion: '2021-04-02',
        estado: 'inactivo',
    }
]