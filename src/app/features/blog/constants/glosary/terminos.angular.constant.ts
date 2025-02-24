import { Categoria, GlosarioModel, IImagen } from "@models/categorias.model";


export const TERMINOS_ANGULAR: GlosarioModel [] = [
    {
        id: 'bfbfe921-9666-402f-98d3-98f45716b57f',
        categoria: Categoria.ANGULAR,
        titulo: 'firstValueFrom (RXJS)',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:true,
        linksReferencia: [
            {
                urlLink:'https://rxjs.dev/api/index/function/firstValueFrom',
                titulo: 'RxJs First Value From',
                img: new IImagen()
            },
            {
                img:{
                    ulrImagen:'https://plantillas_dev.gitlab.io/assets/img/posts/angular/firstValueFrom.png',
                    altura:'350',
                    clase:'img-fluid',
                    nombre:''
                },
                urlLink:'ng-rxjs-first-value-from',
                titulo: ''
            },
        ],
        descripcion: {
            listaTexto: [
                'No nos va a aparecer antes de la versión 7 de la libreria RxJS, esta función viene a reemplazar a "toPromise()", quedando en el abismo de los obsoletos.',
                'Se suele debatir si se usa un observable o una promesa dependiendo se requiera una sola petición o estar escuchando un emisor, en este caso su característica de operar es la de convertir un observable en una promesa que se cumple cuando devuelve el primer valor.'
            ]
        }
    },
    {
        id: '6f3b8325-3262-421f-ac5a-7ed4946487a6',
        titulo: 'lastValueFrom() (RXJS)',
        categoria: Categoria.ANGULAR,
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:true,
        linksReferencia: [],
        descripcion: {
            listaTexto: [
                'No nos va a aparecer antes de la versión 7 de la libreria rxjs, esta función viene a reemplazar a "toPromise()", quedando en el abismo de los obsoletos.',
                'Su característica de operar es la de convertir un observable en una promesa que se cumple cuando devuelve el último valor.'
            ]
        }
    },
    {
        id: 'ebfeb1a0-10d5-49b0-aaa2-4196e8f1dd98',
        categoria: Categoria.ANGULAR,
        titulo: 'first() (RXJS)',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:true,
        linksReferencia: [],
        descripcion: {
            listaTexto: [
                'En simples palabras, esta función devuelve el primer elemento emitido y termina una vez lo reciba.'
            ]
        }
    },
    {
        id: 'ebfeb1a0-10d5-49b0-aaa2-4196e8f1dd98',
        categoria: Categoria.ANGULAR,
        titulo: 'takeUntil() (RXJS)',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:true,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                'Emite valores hasta que le notifiquen que no siga emitiendo con un observable que emite un valor, en ese momento se completa.'
            ]
        }
    },
    {
        id: '3217d630-5cff-4354-87b7-9c26f00e7795',
        categoria: Categoria.ANGULAR,
        titulo: ' EmptyError (RXJS)',
        subtitulo:'',
        fechaActualizacion: '2023-04-02',
        mostrar:true,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                'Dentro de la RxJS, es una interfaz que no contiene elementos, se usa en observables como first(), last(), entre otros.'
            ]
        }
    },
    {
        id: '88946c62-ebc1-45b5-bcd5-84b36e43f896',
        categoria: Categoria.ANGULAR,
        titulo: 'take() (RXJS)',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:true,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                'Emite valores hasta que le notifiquen que no siga emitiendo con un observable que emite un valor, en ese momento se completa.'
            ]
        }
    },
    {
        id: 'bc9b8768-33a0-494d-ab11-5c1395691305',
        categoria: Categoria.ANGULAR,
        titulo: 'BehaviorSubject (RXJS)',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:true,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                'Una particularidad de este observable es que permite una comunicación constante entre varios componentes. O sea, tengo 4 componentes conectados a un behavior Subject, cuando alguno emite un cambio, los otros escuchan y también si uno de esos otros emite algún valor, los otros tendrán ese nuevo cambio almacenado en la variable suscrita. Puede usarse esa particularidad de ambos sentidos para recibir y enviar información a través de la misma variable suscrita.',
                'Cuando se conoce o se ha trabajado frecuentemente con este, se sabe que puede traer comportamientos inesperados en situaciones no controladas. Como, por ejemplo, tener escapes de memoria por un uso exagerado de este operador.',
            ]
        }
    },
    {
        id: '5f28e16a-eb45-4a00-aac4-6334f98ea256',
        categoria: Categoria.ANGULAR,
        titulo: 'Router',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:false,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                'Sistema de manejo de rutas, desde la versión "AngularJS" pasa vario cambios, actualmente '
            ]
        }
    },
    {
        id: '88c903d6-3f8d-49b1-9d4f-8679a4599367',
        categoria: Categoria.ANGULAR,
        titulo: 'GuardsCheckStart - @angular/router',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:true,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                'Evento desencadenado al comienzo de la fase de vigilancia del enrutamiento.'
            ]
        }
    },
    {
        id: 'ea8dc086-a91f-475f-a575-e024c6ed1ad1',
        categoria: Categoria.ANGULAR,
        titulo: 'ChildActivationStart - @angular/router',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:true,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                'Evento desencadenado al comienzo de la parte de activación secundaria de la fase de resolución del enrutamiento.'
            ]
        }
    },
    {
        id: '4c871f47-8b02-46ff-be0c-ad8291190839',
        categoria: Categoria.ANGULAR,
        titulo: 'ActivationStart - @angular/router',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:true,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                'Evento desencadenado al comienzo de la parte de activación de la fase de resolución del enrutamiento.'
            ]
        }
    },
    {
        id: 'ca6bc4f4-11d9-4fe8-b26c-6986836f647e',
        categoria: Categoria.ANGULAR,
        titulo: 'GuardsCheckEnd  - @angular/router',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:true,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                'Evento desencadenado al final de la fase de Guardia del enrutamiento.'
            ]
        }
    },
    {
        id: '2ae90637-6d50-44ea-a5ff-3251e79602a2',
        categoria: Categoria.ANGULAR,
        titulo: 'ResolveStart',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:false,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                ''
            ]
        }
    },
    {
        id: '551a092d-c99f-4302-8f5d-612bf8493632',
        categoria: Categoria.ANGULAR,
        titulo: 'ResolveEnd',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:false,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                ''
            ]
        }
    },
    {
        id: '103678ce-b221-4a37-82c7-f8844c8a54b1',
        categoria: Categoria.ANGULAR,
        titulo: 'ActivationEnd',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:false,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                ''
            ]
        }
    },
    {
        id: '49cad8dc-f7bb-44c9-b45d-dc7deba02733',
        categoria: Categoria.ANGULAR,
        titulo: 'ChildActivationEnd',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:false,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                ''
            ]
        }
    },
    {
        id: '96019f97-c2d3-444a-b835-7168191bd4bf',
        categoria: Categoria.ANGULAR,
        titulo: 'ChildActivationEnd',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:false,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                ''
            ]
        }
    },
    {
        id: '7f04dc8e-e178-4a3c-b8cd-2a1ef1f08fb5',
        categoria: Categoria.ANGULAR,
        titulo: 'AOT (AHead Of Time)',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:false,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                ''
            ]
        }
    },
    {
        id: '10a83161-5d40-4492-9990-9ae88acbf4b8',
        categoria: Categoria.ANGULAR,
        titulo: 'bundles',
        subtitulo:'',
        fechaActualizacion: '2023-04-01',
        mostrar:false,
        linksReferencia: [],
        descripcion: {
            listaTexto:[
                ''
            ]
        }
    },
    {
        id: '1d5abb29-91ed-4b3c-a66f-45eaa1803f11',
        categoria: Categoria.ANGULAR,
        titulo: 'Genexus',
        subtitulo:'',
        fechaActualizacion: '2023-09-13',
        mostrar: true,
        linksReferencia:[],
        descripcion: {
            listaTexto:[
                'Plataforma de desarrollo de software para crear aplicaciones multiplataforma y empresa, destacada por su enfoque en automatización de código.'
            ]
        }
    }

]