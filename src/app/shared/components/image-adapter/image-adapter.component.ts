import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-adapter',
  imports: [],
  templateUrl: './image-adapter.component.html',
  styleUrl: './image-adapter.component.css'
})
export class ImageAdapterComponent {
	@Input() public url: string = '';
	@Input() public class: string = '';
}
