import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIES } from './constants/categories.constant';
import { CategoriesPageModel } from '../../models/categories-page.model';
import { ContentIndexComponent } from '../content-index/content-index.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IndiceDeContenidosModel } from '@models/indice.model';
import { ThemeService } from '../../services/theme.service';

@Component({
	selector: 'app-categories',
	imports: [
		ContentIndexComponent,
		TranslateModule,
		RouterLink],
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.css'
})
export class CategoriesComponent {
	private readonly themeService = inject(ThemeService);

	public categories = CATEGORIES;
	public pasoDeIndice: IndiceDeContenidosModel [] = [];

	/** Tema activo: 'dark' usa iconLight (fondos oscuros), 'light' usa iconDark. */
	get theme() {
		return this.themeService.theme();
	}

	/** Ruta del ícono de una categoría según el tema activo. */
	public iconoCategoria(cat: CategoriesPageModel): string {
		return this.theme === 'dark' ? cat.iconLight : cat.iconDark;
	}


	constructor(private translate: TranslateService){
		this.inicializarVariables();
	}

	get chunkedCategories(): CategoriesPageModel[][] {
		const active = this.categories.filter(c => c.state === 'active');
		const result: CategoriesPageModel[][] = [];
		for (let i = 0; i < active.length; i += 4) {
			result.push(active.slice(i, i + 4));
		}
		return result;
	}

	private inicializarVariables(){
    this.categories.forEach( (cat: CategoriesPageModel) => {
      let grupo: IndiceDeContenidosModel = {
        color: cat.color,
        colorFondo: cat.colorFondo,
        estado: cat.state === 'active' ? 'activo' : 'inactivo',
        nombre: cat.nameCategorie.toUpperCase(),
        posicion: cat.posicion,
        ruta: cat.linkCategory,
        rutaInterna: ''
      }
      this.pasoDeIndice.push(grupo);
    });
  }
}