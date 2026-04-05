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

}
