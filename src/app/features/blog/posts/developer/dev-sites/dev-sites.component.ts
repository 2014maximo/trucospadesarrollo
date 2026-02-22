import { Component } from '@angular/core';
import { CategoriaPostModel, DatosPost } from '@models/categorias.model';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CategoriaModel } from 'src/app/shared/models/post.model';
import { EXT_MONEY } from '../dev-extra-money/constants/dev-extra-money.constant';
import { cargarBreadcrumb, postActual } from '@shared//global-functions';
import { CATEGORIA } from '@constants/categories.constant';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderPostSupplementComponent } from 'src/app/shared/components/header-post-supplement/header-post-supplement.component';

@Component({
  selector: 'app-dev-sites',
  imports: [
    FooterComponent,
    HeaderPostSupplementComponent,
    HeaderComponent],
  templateUrl: './dev-sites.component.html',
  styleUrl: './dev-sites.component.css'
})
export class DevSitesComponent {

  public idPublicacion = '6f3b8325-3262-421f-ac5a-7ed4946487a6';
  public breadcrumb = new CategoriaModel();
  public publicacion = new DatosPost();
  public categoria = new CategoriaPostModel();
  public ideasExtraMoney = EXT_MONEY;


  ngOnInit(): void {
    this.publicacion = postActual(this.idPublicacion)[0];
    this.breadcrumb = cargarBreadcrumb(this.publicacion);
    this.categoria = CATEGORIA.filter(e => e.nombre === this.publicacion.categoria)[0];
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
