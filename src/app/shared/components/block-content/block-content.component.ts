import { Component, Input } from '@angular/core';
import { BlockContentModel } from '../../models/block-content.model';
import { ImageAdapterComponent } from '../image-adapter/image-adapter.component';

@Component({
	selector: 'app-block-content',
	imports: [ImageAdapterComponent],
	templateUrl: './block-content.component.html',
	styleUrl: './block-content.component.css'
})
export class BlockContentComponent {

	@Input() blockContent: BlockContentModel[] = [
		{ //ROW
			blocks: [
				{ // Col
					initialStyle:'col-md-3',
					columns:[
						{
							title:{
								styleText:'f-bebas fs-200 p-0 m-0 text-light',
								text:'1'
							},
							subtitle:{
								styleText:'f-yanone fs-40 lh-40 text-light p-0 text-uppercase mb-2',
								text:'PREDISPOSICIÓN'
							},
							paragraph:[
								{
									text:'Antes de decirle al mundo que buscamos empleo, primero hay que saberlo dentro. Por obvias razones si se esta en la búsqueda es porque presuntamente hay total convencimiento.',
									styleText:'fuenteDos c7 fs-18 lh-20'
								},
								{
									text:'La sola predisposición termina siendo la mayor fuerza que va a conectar todo.'
								},
								{
									text:'No sirve de nada iniciar una búsqueda sin tenerlo como un objetivo prescindible en la vida. '
								}
							]
						},

					]
				},
				{
					initialStyle:'col-md-1'
				},
				{
					initialStyle:'col-md-8',
					columns:[
						{
							image:{
								src:'https://plantillas_dev.gitlab.io/assets/img/posts/developer/busqueda-empleo.jpg',
								alt:'busqueda',
								height:'552',
								width:'auto',
								typeImage: 'type-B',
								creditTarget:'_blank',
								creditUrl:'https://unsplash.com/',
								creditText:'Jeremy Bishop - Unsplash',
								creditClasses:'f-open-sans-c c7'

							}
						}
						
					]
				}
			]
		}
	]

}
