import { DatosPost, EstilosPost, RefImg } from "@models/categorias.model"

export const ESTILO_AI: EstilosPost = {
    color: 'c-Ai',
    colorFondo: 'bg-Ai'
}

export const AI: DatosPost[] = [
    {
        id: 'b8a6b071-c54a-486f-aa25-3facc2f5bacc',
        nombre: 'AI.ai.nombre', // Category post AI
        referenciaBusqueda:'AI.ai.referenciaBusqueda', // artificial intelligence, ml, deep learning
        descripcion: [
            'AI.ai.descripcion.tx1',
            'AI.ai.descripcion.tx2',
            'AI.ai.descripcion.tx3',
            'AI.ai.descripcion.tx4',
            'AI.ai.descripcion.tx5'
        ], // ‘Artificial Intelligence’, as developers from...
        descripcionCorta: '',
        ruta: 'ai',
        componente: 'AiComponent',
        categoria: 'ai',
        mostrarEnPostHome: false,
        estilos: ESTILO_AI,
        fechaCreacion: '2021-01-01',
        fechaActualizacion: '2021-01-01',
        imgHorizontal:new RefImg(),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-2',
        estado: 'inactivo'
    },
    {
        id: 'ba0e987b-1a18-4b42-9719-1ff2045b57b6',
        nombre: 'Spec driven development (SDD)', // Spec driven development (SDD)
        referenciaBusqueda:'', // artificial intelligence, ml, deep learning
        descripcion: [
            'AI.ai.descripcion.tx1'], // 
        descripcionCorta: '',
        ruta: 'blog/ai/sdd',
        componente: 'AiComponent',
        categoria: 'ai',
        mostrarEnPostHome: true,
        estilos: ESTILO_AI,
        fechaCreacion: '2026-03-28',
        fechaActualizacion: '',
        imgHorizontal: new RefImg('https://plantillas_dev.gitlab.io/assets/img/posts/ai/concept-SDD.jpg'),
        imgVertical:'',
        imgCuadro:'',
        posicion: 'rot-2',
        estado: 'activo'
    },
]