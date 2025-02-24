import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { GaleryPostComponent } from '../shared/components/galery-post/galery-post.component';
import { CommonModule } from '@angular/common';
import { SliderHomeComponent } from '../shared/components/slider-home/slider-home.component';
import { MenuHomeComponent } from '../shared/components/menu-home/menu-home.component';
import { PhrasesComponent } from "../shared/components/phrases/phrases.component";
import { FooterHomeComponent } from '../shared/components/footer-home/footer-home.component';
import { TopTecnologyComponent } from '../shared/components/top-tecnology/top-tecnology.component';

@Component({
	selector: 'app-home',
	imports: [
    HeaderComponent,
	FooterHomeComponent,
    CommonModule,
    MenuHomeComponent,
    SliderHomeComponent,
    GaleryPostComponent,
	TopTecnologyComponent,
    PhrasesComponent
],
	standalone: true,
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {

	constructor() {
		console.log('HomeComponent created')
	}

	scroll(el: HTMLElement) {
		el.scrollIntoView();
	}

}
