import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CATEGORIES } from './constants/categories.constant';
import { StaggerDirective } from '../../directives/stagger.directive';

/** Un libro de la estantería: una categoría activa con su presentación. */
export interface LibroCategoria {
	titulo: string;
	ruta: string;
	icono: string;
	colorFondo: string;
	alto: number;
	tono: string;
}

/** Alturas y tonos de piel de los lomos, para que la estantería no parezca uniforme. */
const ALTOS = [290, 320, 270, 305];
const TONOS = ['#2a2420', '#1f2229', '#2b2125', '#232823'];

@Component({
	selector: 'app-categories',
	imports: [TranslateModule, RouterLink, StaggerDirective],
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.css'
})
export class CategoriesComponent {

	/** Solo las categorías activas: las inactivas no se muestran. */
	readonly libros: LibroCategoria[] = CATEGORIES
		.filter(cat => cat.state === 'active')
		.map((cat, i) => ({
			// El nombre visible sale de la ruta (p. ej. /blog/ia → IA)
			titulo: cat.linkCategory.split('/').pop()!.toUpperCase(),
			ruta: cat.linkCategory,
			// Los lomos son oscuros en cualquier tema: siempre el ícono claro
			icono: cat.iconLight,
			colorFondo: cat.colorFondo,
			alto: ALTOS[i % ALTOS.length],
			tono: TONOS[i % TONOS.length]
		}));

}
