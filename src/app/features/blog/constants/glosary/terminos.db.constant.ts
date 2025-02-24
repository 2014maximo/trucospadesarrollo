import { Categoria, GlosarioModel, IImagen } from "@models/categorias.model";


export const TERMINOS_DB: GlosarioModel [] = [
    {
        id: 'd85bb2c7-72a7-4fa8-b1ba-04968036a8c3',
        categoria: Categoria.DB,
        titulo: 'Suite de aplicaciones Siebel CRM',
        subtitulo:'',
        fechaActualizacion: '2024-04-16',
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
                'Partiendo del término módulos Siebel, que se refiere a áreas principales de una empresa, como toda esa parte funcional separada en categorías. Por ejemplo Ventas, El área de Marketing, Órdenes, Soporte, etc. Entonces, un módulo Siebel es todo lo que atrapa una categoria, que le permite poder funcionar en una organización. Ahora cuando se habla de la suite hace referencia a una plataforma de la empresa Oracle Corporation que permite gestionar relaciones y control de cada uno de estos módulos.'
            ]
        }
    }
];
