import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CATEGORIA } from '@constants/categories.constant';
import { CategoriaPostModel, DatosPost, GlosarioModel, SubCategoriaModel } from '@models/categorias.model';
import { IndiceDeContenidosModel } from '@models/indice.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { postActual } from '@shared//global-functions';
import { ContentAuthorComponent } from 'src/app/shared/components/content-author/content-author.component';
import { ContentAuthorModel } from 'src/app/shared/models/content-author.model';
import { AddsModel } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-ai-category-header',
  imports: [CommonModule, TranslateModule, ContentAuthorComponent],
  templateUrl: './ai-category-header.component.html',
  styleUrl: './ai-category-header.component.css'
})
export class AiCategoryHeaderComponent {
  @Input() nombreCategoria: string = '';
  @Input() idPost: string = '';
  @Input() adds = new AddsModel();

  public indice: IndiceDeContenidosModel[] = [];
  public glosario: GlosarioModel[] = [];
  public datesAuthor = new ContentAuthorModel();

  public categoria = new CategoriaPostModel();
  public subCategorias: SubCategoriaModel[] = [];
  public publicacion = new DatosPost();

  constructor(private translate: TranslateService){}


  ngOnInit(): void {
    this.inicializarVariables();
  }

  private inicializarVariables() {
    this.categoria = CATEGORIA.filter((cat: CategoriaPostModel) => cat.nombre === this.nombreCategoria)[0];
    let post: DatosPost[] = this.categoria.post;
    post.forEach((post: DatosPost, i: number) => {
      let seleccionado: IndiceDeContenidosModel = {
        color: '',
        colorFondo: post.estilos.colorFondo,
        estado: post.estado,
        nombre: post.nombre,
        posicion: post.posicion,
        ruta: post.ruta,
        rutaInterna: ''
      }
      this.indice.push(seleccionado)
    });


    this.categoria ? this.subCategorias = this.categoria.subcategorias : [];
    this.categoria ? this.glosario = this.categoria.glosario : [];
    this.publicacion = postActual(this.idPost)[0];
    console.log((this.publicacion.descripcion[0]));

    this.datesAuthor = {
      name:'Alex M.',
      srcAvatar:'assets/img/author.png',
      linkRefenceAuthor: 'https://2014maximo.github.io/alexmunoz/'
    }
  }

  traducirTexto(texto: string): string {
    return this.translate.instant(texto);
  }
}
