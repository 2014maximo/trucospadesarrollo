import { Component } from '@angular/core';
import { CategoriaPostModel } from '@models/categorias.model';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { AddsModel } from 'src/app/shared/models/post.model';
import { AiCategoryHeaderComponent } from './ai-category-header/ai-category-header.component';
import { CategoryHeaderComponent } from 'src/app/shared/components/category-header/category-header.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { GoUpComponent } from 'src/app/shared/components/go-up/go-up.component';
import { AiCategoryContentComponent } from './ai-category-content/ai-category-content.component';

@Component({
  selector: 'app-ai-category',
  imports: [
    FooterComponent,
    AiCategoryContentComponent,
    AiCategoryHeaderComponent,
    CategoryHeaderComponent,
    HeaderComponent,
    GoUpComponent
  ],
  templateUrl: './ai-category.component.html',
  styleUrl: './ai-category.component.css'
})
export class AiCategoryComponent {

  public idPost = 'b8a6b071-c54a-486f-aa25-3facc2f5bacc';
  public partsAdds: AddsModel = { contentIndex: true, roadMap: true, origin: true };
  public categoria = new CategoriaPostModel();

}
