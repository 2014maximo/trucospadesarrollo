import { EstilosPost, RefImg, SubCategoriaModel } from "../../models/categorias.model"


export const ESTILO_RXJS: EstilosPost = {
    color: 'c-Rxjs',
    colorFondo: 'bg-Rxjs'
}

export const SUB_NG: SubCategoriaModel[] = [
    {
        subCategoria: 'rxjs',
        post: [
            {
                id: 'ebfeb1a0-10d5-49b0-aaa2-4196e8f1dd98',
                nombre: 'FirstValueFrom() - RXJS',
                referenciaBusqueda:'',
                descripcion: [
                    'Operador similar a una promesa, aparece después de la versión 7 de RXJS, este viene a reemplazar al "toPromise()", quedando en el abismo de los obsoletos.', 'Su característica de operar es la de convertir un observable en una promesa, y esta se cumple una vez devuelva el primer valor.'
                ],
                descripcionCorta: 'Funcionamiento detallado con ejemplos de este operador, que inicia en la versión 7 de la librería RXJS, convierte un observable en promesa.',
                ruta: 'ng-rxjs-first-value-from',
                componente: 'NgRxjsFirstValueFromComponent',
                mostrarEnPostHome: true,
                estilos: ESTILO_RXJS,
                fechaCreacion: '2023-03-24',
                fechaActualizacion: '',
                imgHorizontal: new RefImg(''),
                imgVertical:'',
                imgCuadro:'',
                categoria: 'angular',
                posicion: 'rot-1',
                estado: 'activo',
                imgSlider: undefined
            },
        ]
    }
]
