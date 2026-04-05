import { Component, Input } from '@angular/core';
import { CategoriaPostModel, DatosPost } from '@models/categorias.model';
import { IndiceDeContenidosModel } from 'src/app/shared/models/indice.model';
import { AddsModel } from 'src/app/shared/models/post.model';
import { CATEGORIA } from '@constants/categories.constant';
import { CommonModule } from '@angular/common';
import { BlockTextComponent } from 'src/app/shared/components/block-text/block-text.component';

@Component({
  selector: 'app-ai-category-content',
  imports: [
    CommonModule,
    BlockTextComponent
  ],
  templateUrl: './ai-category-content.component.html',
  styleUrl: './ai-category-content.component.css'
})
export class AiCategoryContentComponent {
  @Input() nombreCategoria: string = '';
  @Input() adds = new AddsModel();

  public categoria = new CategoriaPostModel();
  public indice: IndiceDeContenidosModel[] = [];


  constructor() {
  }

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
  }


}
