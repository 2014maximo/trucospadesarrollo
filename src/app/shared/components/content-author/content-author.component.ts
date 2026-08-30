import { Component, Input } from '@angular/core';
import { ContentAuthorModel } from '../../models/content-author.model';

@Component({
  selector: 'app-content-author',
  imports: [],
  templateUrl: './content-author.component.html',
  styleUrl: './content-author.component.css'
})
export class ContentAuthorComponent {

  @Input() datesAuthor: ContentAuthorModel = new ContentAuthorModel();

  /** Presentación: 1 = bloque grande (por defecto), 2 = avatar compacto inline para tarjetas de post, 3 = avatar mediano para la vista del post. */
  @Input() tipo: 1 | 2 | 3 = 1;

}
