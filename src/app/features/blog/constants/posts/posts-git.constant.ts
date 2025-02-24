import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_GIT: EstilosPost = {
    color: 'c-Git',
    colorFondo: 'bg-Git'
}

export const GIT: DatosPost[] = [
    {
        id: 'b72262ee-1257-4b4d-a980-d56190506dfe',
        nombre: 'GIT.git.nombre',
        referenciaBusqueda:'GIT.git.referenciaBusqueda',
        descripcion: [
            'GIT.git.descripcion.tx1',
            'GIT.git.descripcion.tx2',
            'GIT.git.descripcion.tx3',
            'GIT.git.descripcion.tx4',
            'GIT.git.descripcion.tx5',
            'GIT.git.descripcion.tx6',
            'GIT.git.descripcion.tx7',
            'GIT.git.descripcion.tx8',
            'GIT.git.descripcion.tx9',
            'GIT.git.descripcion.tx10'
        ],
        descripcionCorta: 'GIT.git.descripcionCorta',
        ruta: 'git',
        componente: 'GitComponent',
        categoria: 'git',
        mostrarEnPostHome: false,
        estilos: ESTILO_GIT,
        fechaCreacion: '2021-05-02',
        fechaActualizacion: '2021-05-02',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-1',
        estado: 'inactivo'
    },
    {
        id: '4871cb38-9831-4099-bd70-c0b540bf47a1',
        nombre: 'GIT.git-errores.nombre',
        referenciaBusqueda:'GIT.git-errores.referenciaBusqueda',
        descripcion: ['GIT.git-errores.descripcion.tx1'],
        descripcionCorta: 'GIT.git-errores.descripcionCorta',
        ruta: 'git-errores',
        componente: 'GitErroresComponent',
        categoria: 'git',
        mostrarEnPostHome: false,
        estilos: ESTILO_GIT,
        fechaCreacion: '2023-25-07',
        fechaActualizacion: '2023-23-08',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/git/errores-git.jpg'),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-1',
        estado: 'inactivo',
        imgSlider: {
            alt: 'Errores git',
            height: '600',
            id: '2',
            ruta: 'https://plantillas_dev.gitlab.io/assets/img/posts/git/errores-gitSlider.jpg',
            width: 'auto',
            post: 'git-errores'
        }
    }
]