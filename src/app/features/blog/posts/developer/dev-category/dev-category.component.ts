import { Component } from '@angular/core';
import { CategoryHeaderComponent } from 'src/app/shared/components/category-header/category-header.component';
import { FooterHomeComponent } from 'src/app/shared/components/footer-home/footer-home.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { AddsModel } from 'src/app/shared/models/post.model';
import { CategoriaPostModel } from '@models/categorias.model';
import { DevCategoryContentComponent } from './dev-category-content/dev-category-content.component';

@Component({
  selector: 'app-dev-category',
  imports: [
    FooterHomeComponent,
    DevCategoryContentComponent,
    CategoryHeaderComponent,
    HeaderComponent
  ],
  templateUrl: './dev-category.component.html',
  styleUrl: './dev-category.component.css'
})
export class DevCategoryComponent {

  public idPost = '441cab09-256e-446f-bb2c-f017dd6d217b';
  public partsAdds: AddsModel = { contentIndex: true, roadMap: true, origin: true };
  public categoria = new CategoriaPostModel();


  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
