import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_DB: EstilosPost = {
    color: 'c-Db',
    colorFondo: 'bg-Db'
}

export const DB: DatosPost[] = [
    {
        id: '6569240889',
        nombre: 'DB.db.nombre',
        referenciaBusqueda:'DB.db.referenciaBusqueda',
        descripcion: [
            "DB.db.descripcion.tx1",
            "DB.db.descripcion.tx2",
            "DB.db.descripcion.tx3",
            "DB.db.descripcion.tx4",
            "DB.db.descripcion.tx5",
            "DB.db.descripcion.tx6",
            "DB.db.descripcion.tx7",
            "DB.db.descripcion.tx8",
            "DB.db.descripcion.tx9",
            "DB.db.descripcion.tx10",
            "DB.db.descripcion.tx11",
            "DB.db.descripcion.tx12",
            "DB.db.descripcion.tx13",
            "DB.db.descripcion.tx14"
        ],
        descripcionCorta: 'DB.db.descripcionCorta',
        ruta: 'db',
        componente: 'DbComponent',
        categoria: 'db',
        mostrarEnPostHome: false,
        estilos: ESTILO_DB,
        fechaCreacion: '2021-01-05',
        fechaActualizacion: '2021-01-05',
        imgHorizontal: new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-2',
        estado: 'inactivo'
    },
    {
        id: 'e0d1b708-45bc-4749-a648-3c41d14ab7cc',
        nombre: 'DB.db-firebase.nombre',
        referenciaBusqueda:'DB.db-firebase.referenciaBusqueda',
        descripcion: [
            'DB.db-firebase.descripcion.tx1'
        ],
        descripcionCorta: 'DB.db-firebase.descripcionCorta',
        ruta: 'db-firebase',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_DB,
        fechaCreacion: '2023-09-14',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/db/firebase.png','Logo Firebase','auto','220'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'db',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    },
    {
        id: '52afbc12-1bbc-4225-848d-faab850761dc',
        nombre: 'DB.db-sql.nombre',
        referenciaBusqueda:'DB.db-sql.refenciaBusqueda',
        descripcion: [
            'DB.db-sql.descripcion.tx1'
        ],
        descripcionCorta: 'DB.db-sql.descripcionCorta',
        ruta: 'db-sql',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_DB,
        fechaCreacion: '2023-09-14',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/db/sql.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'db',
        posicion: 'rot-2',
        estado: 'inactivo',
        imgSlider: undefined
    },
    {
        id: 'c20a999c-d149-42fa-95fa-d4a2b7371bb4',
        nombre: 'DB.db-sql-server.nombre',
        referenciaBusqueda:'DB.db-sql-server.referenciaBusqueda',
        descripcion: [
            'DB.db-sql-server.descripcion.tx1'
        ],
        descripcionCorta: 'DB.db-sql-server.descripcionCorta',
        ruta: 'db-sql-server',
        componente: '',
        mostrarEnPostHome: false,
        estilos: ESTILO_DB,
        fechaCreacion: '2023-09-14',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/db/sql-server.jpg'),
        imgVertical:'',
        imgCuadro:'',
        categoria: 'db',
        posicion: 'rot-1',
        estado: 'inactivo',
        imgSlider: undefined
    },
]