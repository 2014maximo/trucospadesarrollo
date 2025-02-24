import { Categoria, GlosarioModel, IImagen } from "@models/categorias.model";


export const TERMINOS_HTML: GlosarioModel [] = [
    {
        id: '50b9670c-407f-4369-b5c8-1351f3b0ca8c',
        categoria: Categoria.HTML,
        titulo: 'Clickbait',
        subtitulo:'',
        fechaActualizacion: '2024-06-10',
        mostrar:true,
        linksReferencia: [
            {
                urlLink:'',
                titulo: '',
                img: new IImagen()
            },
            {
                img:{
                    ulrImagen:'',
                    altura:'350',
                    clase:'img-fluid',
                    nombre:''
                },
                urlLink:'',
                titulo: ''
            },
        ],
        descripcion: {
            listaTexto: [
                'Es un término referido a un contenido web exagerado o a veces hasta falso o engañoso, que busca atraer atención de usuarios con tal de que el usuario de click y revise el contenido.',
                'Por lo general son títulos sensacionalistas, imágenes atractivas, promesas exageradas, etc.'
            ]
        }
    }
];
