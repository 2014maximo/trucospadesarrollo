import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CATEGORIA } from '@constants/categories.constant';
import { CategoriaPostModel, DatosPost } from '@models/categorias.model';
import { IndiceDeContenidosModel } from '@models/indice.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AddsModel } from 'src/app/shared/models/post.model';
import { FRONTEND_ROADMAP } from '../dev-category.constants';
import { FirstDescriptionBlockComponent } from 'src/app/shared/components/first-description-block/first-description-block.component';

@Component({
  selector: 'app-dev-category-content',
  imports: [
    TranslateModule,
    FirstDescriptionBlockComponent,
    CommonModule
  ],
  templateUrl: './dev-category-content.component.html',
  styleUrl: './dev-category-content.component.css'
})
export class DevCategoryContentComponent {

  @Input() nombreCategoria : string = '';
  @Input() adds = new AddsModel();

  public categoria = new CategoriaPostModel();
  public indice: IndiceDeContenidosModel [] = [];
  public roadMapDescriptions = FRONTEND_ROADMAP;

  constructor(private translate: TranslateService){
  }

  ngOnInit(): void {
    this.inicializarVariables();
  }

  private inicializarVariables(){
      this.categoria = CATEGORIA.filter((cat: CategoriaPostModel) => cat.nombre === this.nombreCategoria)[0];
      let post: DatosPost[] = this.categoria.post;
      post.forEach( (post:DatosPost, i:number ) => {
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
  }

  traducirTexto(texto: string): string {
    return this.translate.instant(texto);
  }
}
