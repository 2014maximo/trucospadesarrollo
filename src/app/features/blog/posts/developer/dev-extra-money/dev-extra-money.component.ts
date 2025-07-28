import { Component } from '@angular/core';
import { CATEGORIA } from '@constants/categories.constant';
import { CategoriaPostModel, DatosPost } from '@models/categorias.model';
import { cargarBreadcrumb, postActual } from '@shared//global-functions';
import { HeaderPostSupplementComponent } from 'src/app/shared/components/header-post-supplement/header-post-supplement.component';
import { HeaderPostComponent } from 'src/app/shared/components/header-post/header-post.component';
import { CategoriaModel } from 'src/app/shared/models/post.model';
import { EXTRA_MONEY } from './constants/dev-extra-money.constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dev-extra-money',
  imports: [HeaderPostComponent, HeaderPostSupplementComponent, CommonModule,],
  templateUrl: './dev-extra-money.component.html',
  styleUrl: './dev-extra-money.component.css'
})
export class DevExtraMoneyComponent {

  public idPublicacion = '3cc3d6ca-15db-4fea-b225-6cc0c715e8c8';
	public breadcrumb = new CategoriaModel();
  public publicacion = new DatosPost();
  public categoria = new CategoriaPostModel();
  public ideasExtraMoney: string[] = EXTRA_MONEY


  ngOnInit():void {
    this.publicacion = postActual(this.idPublicacion)[0];
    this.breadcrumb = cargarBreadcrumb(this.publicacion);
    this.categoria = CATEGORIA.filter(e => e.nombre === this.publicacion.categoria)[0];
  }

}
