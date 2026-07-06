import { Component, Input } from '@angular/core';
import { BlockContentModel } from '../../models/block-content.model';

@Component({
	selector: 'app-block-content',
	imports: [],
	templateUrl: './block-content.component.html',
	styleUrl: './block-content.component.css'
})
export class BlockContentComponent {

	@Input() blockContent: BlockContentModel[] = [
		
	]

}
