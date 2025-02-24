import { Component, OnInit } from '@angular/core';
import { CATEGORIA } from '@constants/categories.constant';
import { CategoriaPostModel, DatosPost, SubCategoriaModel } from '@models/categorias.model';
import { IndiceDeContenidosModel } from '@models/indice.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { datosCategoria, reduccionTexto } from '@shared//global-functions';
import { ContentIndexComponent } from '../content-index/content-index.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-home',
  imports: [
    ContentIndexComponent,
    TranslateModule,
    CommonModule
  ],
  templateUrl: './menu-home.component.html',
  styleUrl: './menu-home.component.css'
})
export class MenuHomeComponent implements OnInit {
  public menus: any;
  public categorias: CategoriaPostModel[] = [];
  public pasoDeIndice: IndiceDeContenidosModel [] = [];
  public claseContenedor: string = '';
  public posts = CATEGORIA;
  public postsModelo: DatosPost[] | SubCategoriaModel[] = [];

  constructor(private translate: TranslateService) {
    this.inicializarVariables();
  }

  ngOnInit(): void {
    let dato = datosCategoria('android',12);
  }

  private inicializarVariables(){
    this.menus = {
      menuUno: this.extraerMenu(['android','angular','css', 'dart']),
      menuDos: this.extraerMenu(['db','developer','electron', 'flutter']),
      menuTres: this.extraerMenu(['git','html','java', 'javascript']),
      menuCuatro: this.extraerMenu(['kotlin','kubernetes','linux', 'net']),
      menuCinco: this.extraerMenu(['php','react','typescript','wordpress'])
    }

    this.categorias = CATEGORIA;

    this.claseContenedor = 'mt-2';
    
    CATEGORIA.forEach( (cat:CategoriaPostModel, i:number) => {
      let grupo: IndiceDeContenidosModel = {
        color: '',
        colorFondo: cat.colorFondo,
        estado: cat.estado,
        nombre: cat.nombre.toUpperCase(),
        posicion: cat.posicion,
        ruta: cat.ruta,
        rutaInterna: ''
      }
      this.pasoDeIndice.push(grupo);
    });
  }




  private extraerMenu(referencias: string[]):any[]{
    let menu:any[]=[];
    referencias.forEach( (e:any, i:number) => {
      let categorias = this.posts.filter( elemento => elemento.nombre === e)
      menu.push(categorias[0]);
    })
    return menu
  }


  public abrirMenuCategoria(categoria: string, abertura: string){
    //let shand = document.getElementsByClassName('s-hand') as HTMLCollectionOf<HTMLElement>;

    let shand = document.getElementsByClassName(categoria) as HTMLCollectionOf<HTMLElement>

    if (shand.length != 0) {
      shand[0].style.width = `${abertura}`;
    }
  }

  public cierreMenu(categoria: string){
    let shand2 = document.getElementsByClassName(categoria) as HTMLCollectionOf<HTMLElement>

    if (shand2.length != 0) {
      shand2[0].style.width = "0";
    }
  }

  public reduccirTexto(cantPalabras: number, maxPalabra: number, textoCompleto: string): string{
    return reduccionTexto(cantPalabras, maxPalabra, textoCompleto)
  }

  public filtrarActivo(grupo: DatosPost[]):DatosPost[]{
    return grupo.filter( publi => publi.estado === 'activo' )
  }

  public validarActivo(estado: string):boolean{
    return estado === 'activo'? true : false
  }

  traducirTexto(texto: string): string {
    return this.translate.instant(texto);
  }

}

