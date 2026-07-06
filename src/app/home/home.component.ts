import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { GaleryPostComponent } from '../shared/components/galery-post/galery-post.component';
import { CommonModule } from '@angular/common';
import { SliderHomeComponent } from '../shared/components/slider-home/slider-home.component';
import { PhrasesComponent } from "../shared/components/phrases/phrases.component";
import { FooterHomeComponent } from '../shared/components/footer-home/footer-home.component';
import { GoUpComponent } from '../shared/components/go-up/go-up.component';
import { CategoriesComponent } from '../shared/components/categories/categories.component';
import { BlockContentComponent } from '../shared/components/block-content/block-content.component';

@Component({
	selector: 'app-home',
	imports: [
		HeaderComponent,
		FooterHomeComponent,
		BlockContentComponent,
		CommonModule,
		SliderHomeComponent,
		GaleryPostComponent,
		PhrasesComponent,
		CategoriesComponent,
		GoUpComponent
	],
	standalone: true,
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {

	constructor() {
	}

	scroll(el: HTMLElement) {
		el.scrollIntoView();
	}

}
