import { Component, OnInit, Input } from '@angular/core';
import { CATEGORIA } from '@constants/categories.constant';
import { CategoriaPostModel, DatosPost, SubCategoriaModel } from '@models/categorias.model';
import { IndiceDeContenidosModel } from '@models/indice.model';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-index',
  imports: [CommonModule],
  templateUrl: './content-index.component.html',
  styleUrl: './content-index.component.css'
})
export class ContentIndexComponent implements OnInit {

  @Input() indice: IndiceDeContenidosModel [] = [
    {
      nombre: '',
      posicion: '',
      ruta: '',
      colorFondo: '',
      color: '',
      estado: ''
    },
  ];

  @Input() categoria: string = '';
  @Input() contenido: string = '';
  @Input() clase: string = '';
  
  public posts: DatosPost[] = [];
  public subcategorias: SubCategoriaModel[] = [];

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {

    CATEGORIA.forEach(( p: CategoriaPostModel ) => {
      if(p.nombre.includes(this.categoria)){this.posts = p.post; this.subcategorias = p.subcategorias}
    });

    switch(this.contenido){
      case 'subcategorias':
        this.cargarSubcategorias();
        break;
      
      case 'categorias':
        this.cargarCategorias();
        break;
    }
  }

  private cargarCategorias(){
    this.posts.forEach(( p:DatosPost, indice:number) => {
      this.indice[indice].color = p.estilos.color;
      this.indice[indice].colorFondo = p.estilos.colorFondo;
      this.indice[indice].estado = p.estado;
      this.indice[indice].nombre = p.nombre;
      this.indice[indice].posicion = p.posicion;
      this.indice[indice].ruta = p.ruta;
    })
  }

  private cargarSubcategorias(){
    this.subcategorias.forEach(( c: SubCategoriaModel, i:number ) => {
      c.post.forEach((p: DatosPost, idx: number) => {
        this.indice[idx].color = 'text-light';
        this.indice[idx].colorFondo = p.estilos.colorFondo;
        this.indice[idx].estado = p.estado;
        this.indice[idx].nombre = p.nombre;
        this.indice[idx].posicion = p.posicion;
        this.indice[idx].ruta = p.ruta;
      })
    });
  }

  scroll(id: string) {
    let el = document.getElementById(id);
    // @ts-ignore: Object is possibly 'null'.
    el.scrollIntoView();
  }

  public validaEstado(estado: string):boolean{
    return estado === 'activo'? true : false
  }

  public filtrarIndiceActivo(grupo: IndiceDeContenidosModel[]):IndiceDeContenidosModel[]{
    return grupo.filter( publi => publi.estado === 'activo' )
  }

  traducirTexto(texto: string, recortar:number): string {
    let txt: string = texto? this.translate.instant(texto):'';
    let recorte = recortar === 1? this.recortarTexto(txt) : txt;

    
    return typeof(recorte) == 'object'? texto : recorte;
  }

  recortarTexto(texto:string):string{
    let recorte:string='';
    if(texto.length > 20){
      recorte = texto.substring(0,22);
    }else{
      recorte = texto;
    }
    return recorte
  }

}
