import { Component } from '@angular/core';
import { CategoriaPostModel } from '@models/categorias.model';
import { CategoryHeaderComponent } from 'src/app/shared/components/category-header/category-header.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { GoUpComponent } from 'src/app/shared/components/go-up/go-up.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { AddsModel } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-angular-category',
  imports: [
    HeaderComponent,
    FooterComponent,
    CategoryHeaderComponent,
    GoUpComponent],
  templateUrl: './angular-category.component.html',
  styleUrl: './angular-category.component.css'
})
export class AngularCategoryComponent {

  public idPost = 'eb4011f5-81df-4261-b5c5-8f58d2ba88b5';
  public partsAdds: AddsModel = { contentIndex: true, roadMap: true, origin: true };
  public categoria = new CategoriaPostModel();

  constructor(){
  }

}
