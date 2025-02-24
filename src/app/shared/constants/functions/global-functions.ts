import { Route } from '@angular/router';

import { CategoriaModel, PostModel } from '../../models/post.model';
import { CATEGORIA } from '@constants/categories.constant';
import { CategoriaPostModel, DatosPost, SubCategoriaModel } from '@models/categorias.model';
import { IndiceDeContenidosModel } from '@models/indice.model';

export function copiarAlPortapapeles(cadenaAlclipboard: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = cadenaAlclipboard;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

export function traerPost(id: string, posts: PostModel[]){
  return posts.find( post => post.id_post === id);
}

export function postActual(idPost: string): DatosPost[]{
  let post:DatosPost[]=[];
  CATEGORIA.forEach((e:CategoriaPostModel, i:number)=>{
    e.post.forEach((element:DatosPost) => {
      post.push(element);
    });

    e.subcategorias.forEach((s: SubCategoriaModel)=>{
      s.post.forEach((p: DatosPost) => {
        post.push(p);
      });
    });
  });
  return post.filter( publicacion => publicacion.id === idPost);
}

export function textoAFecha(fecha: string): Date{
  let dato = fecha.split('-');
  return new Date(`${dato[0]}/${dato[1]}/${dato[2]}`)
}

export function extraerListaRutas(categoria:[]):Route[]{
  let rutas:Route[]=[];

  for(let i=0; i < categoria.length; i++){
    
  }

  return rutas
}

export function busquedaGeneral(array: any, bloque: string, palabra: string){

  return array.filter((element:any) => element[bloque].toUpperCase()
  .replace("Á", "A")
  .replace("É", "E")
  .replace("Í", "I")
  .replace("Ó", "O")
  .replace("Ú", "U")
  .replace("Ü", "U")
  .includes(palabra.toUpperCase()
    .replace("Á", "A")
    .replace("É", "E")
    .replace("Í", "I")
    .replace("Ó", "O")
    .replace("Ú", "U")
    .replace("Ü", "U")));
          
}

export function datosCategoria(cat: string, referencia: number): any{
  let datoCategoria: any;
  
  let categoriaFiltrada: CategoriaPostModel[] = CATEGORIA.filter(( categoria: CategoriaPostModel ) => {
    return categoria.nombre === cat
  });

  categoriaFiltrada;

  switch (referencia) {
    case 1:
      datoCategoria = categoriaFiltrada[0].abertura
      break

    case 2:
      datoCategoria = categoriaFiltrada[0].alturaIcono
      break
  
    case 3:
      datoCategoria = categoriaFiltrada[0].nombre
      break

    case 4:
      datoCategoria = categoriaFiltrada[0].color
      break

    case 5:
      datoCategoria = categoriaFiltrada[0].colorFondo
      break

    case 6:
      datoCategoria = categoriaFiltrada[0].descripcion
      break

    case 7:
      datoCategoria = categoriaFiltrada[0].descripcionCorta
      break

    case 8:
      datoCategoria = categoriaFiltrada[0].estado
      break

    case 9:
      datoCategoria = categoriaFiltrada[0].id
      break

    case 10:
      datoCategoria = categoriaFiltrada[0].post
      break

    case 11:
      datoCategoria = categoriaFiltrada[0].ruta
      break

    case 12:
      datoCategoria = categoriaFiltrada[0].rutaIcono
      break

    case 13:
      datoCategoria = categoriaFiltrada[0].subcategorias
      break

    default:
      datoCategoria = '';
  }

  return datoCategoria

}

export function reduccionTexto(cantPalabras: number, maxPalabra: number, textoCompleto: string): string{
  // SI ES UNA SOLA PALABRA, QUE LA CANTIDAD DE CARACTERES SEA MENOR A ${maxPalabra}
  // SI SON 2 PALABRAS, QUE LA CANTIDAD DE CARACTERES SEA MENOR A
  // SI SON 3 PALABRAS, QUE LA CANTIDAD DE CARACTERES SEA MENOR A
   let reducido: string = textoCompleto.substring(0, 20);
  /*let cantidadPalabras: string [] = textoCompleto.split(' ');

  switch(cantidadPalabras.length){
    case 1:
      reducido = textoCompleto;
    break

    case 2:
      reducido = textoCompleto;
    break

    case 3:

  }  */


  return reducido;
}

export function abrirUrl(link:string){
  window.open(link, '_blank');
}

export function cargarIndice(publicacion: DatosPost): IndiceDeContenidosModel[]{
  return [
    {
      nombre: publicacion.nombre.toUpperCase(),
      color: publicacion.estilos.color,
      colorFondo: publicacion.estilos.colorFondo,
      estado: publicacion.estado,
      posicion: publicacion.posicion,
      ruta: publicacion.ruta
    }]
}

export function cargarBreadcrumb(publicacion: DatosPost):CategoriaModel{
  return {
    activo: publicacion.estado === 'activo'? true:false,
    categoria: publicacion.categoria.toUpperCase(),
    colorText: publicacion.estilos.color,
    ruta: publicacion.categoria
  }
}