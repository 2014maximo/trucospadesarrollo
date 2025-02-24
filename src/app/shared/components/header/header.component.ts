import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriaModel } from '../../models/post.model';
import { FormControl, FormGroup } from '@angular/forms';
import { CATEGORIA } from '@constants/categories.constant';
import { CategoriaPostModel, DatosPost } from '@models/categorias.model';
import { Router } from '@angular/router';
import { Subject, firstValueFrom } from 'rxjs';
import { busquedaGeneral } from '@shared//global-functions';
import { TraduccionService } from '../../services/traduccion.service';
import { IndiceDeContenidosModel } from '@models/indice.model';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContentIndexComponent } from '../content-index/content-index.component';

@Component({
	selector: 'app-header',
	imports: [
		TranslateModule,
		ReactiveFormsModule,
		CommonModule,
		FormsModule,
		ContentIndexComponent
	],
	standalone: true,
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
})
export class HeaderComponent {

	public formBasic: FormGroup;
	public categorias = CATEGORIA;
	public todosLosPost: DatosPost[] = [];
	public todosLosPostTraducidos: DatosPost[] = [];
	public mostrarResultados: boolean = false;
	public encontrados: DatosPost[] = [];
	public lang = navigator.language;
	public lenguajes: string[] = ['es', 'en', 'fr'];
	public idiomaActual: string = '';
	public ondestroy$: Subject<boolean> = new Subject();
	public categoriasMenu = false;
	public pasoDeIndice: IndiceDeContenidosModel[] = [];
	public claseContenedor: string = '';
	public showSearch: boolean = false;
	public showMenu: boolean = true;
	public showLanguajes: boolean = false;
	public showCategories: boolean = false;
	@Output() recargarTraduccion: EventEmitter<any> = new EventEmitter();

	@Input() categoria: CategoriaModel = {
		activo: false,
		categoria: '',
		ruta: '',
		colorText: ''
	};

	constructor(private router: Router,
				public translate: TranslateService,
				private traduccion: TraduccionService) {

		if (localStorage.getItem("idioma")) {
			this.idiomaActual = localStorage.getItem('idioma') ?? '';
		} else {
			this.idiomaActual = navigator.language.split('-')[0];
		}
		translate.setDefaultLang(navigator.language.split('-')[0]);
		translate.use(this.idiomaActual);
		this.cargarListaLenguajes(this.idiomaActual);
		this.traducirColeccion(this.idiomaActual);

		this.inicializarVariables();
		this.formBasic = new FormGroup({
			'busqueda': new FormControl('')
		});

		this.translate.addLangs(['fr', 'en', 'es']);
	    this.translate.setDefaultLang('es');
	    this.translate.use('es');
	}

	private inicializarVariables() {
		this.todosLosPostTraducidos = this.traduccion.todosLosPostTraducidos;
		CATEGORIA.forEach((cat: CategoriaPostModel, i: number) => {
			let grupo: IndiceDeContenidosModel = {
				color: '',
				colorFondo: cat.colorFondo,
				estado: cat.estado,
				nombre: cat.nombre.toUpperCase(),
				posicion: cat.posicion,
				ruta: cat.ruta,
				rutaInterna: ''
			}
			this.pasoDeIndice.push(grupo);
		});
	}

	public buscar(e: any) {
		let buscar = this.formBasic.value.busqueda;
		if (e.key && buscar) {

			this.mostrarResultados = true;
			this.encontrados = busquedaGeneral(this.todosLosPostTraducidos, 'referenciaBusqueda', buscar);
		} else {
			this.mostrarResultados = false;
		}
	}

	openSearch(){
		this.showSearch = !this.showSearch;
		this.showMenu = !this.showMenu;
	}
	closeOptions(){
		this.showMenu = true;
		this.showSearch = false;
		this.showLanguajes = false;
		this.showCategories = false
	}
	openLanguage(){
		this.showLanguajes = !this.showLanguajes;
		this.showMenu = !this.showMenu;
	}
	openCategories(){
		this.showCategories = !this.showCategories;
		this.showMenu = !this.showMenu;
	}

	public desaparecerTablaBusqueda() {
		setTimeout(() => {
			this.mostrarResultados = false;
			this.formBasic.get('busqueda')?.setValue('');
		}, 2000)
	}

	public irAlPost(post: string) {
		this.router.navigateByUrl(post);
	}

	public procesoCambioLenguaje(a: string) {
		localStorage.setItem("idioma", a);
		this.idiomaActual = a;
		this.traduccion.cambiarIdioma(a);
		this.cargarListaLenguajes(a);
		this.traducirColeccion(a);
	}

	cargarListaLenguajes(a: string) {
		this.lenguajes = ['es', 'en', 'fr'];

		let indice = this.lenguajes.indexOf(a);
		if (indice !== -1) {
			this.lenguajes = this.lenguajes.slice(0, indice).concat(this.lenguajes.slice(indice + 1));
		}
	}

	async traducirColeccion(idioma: string) {
		for (let i = 0; i < this.todosLosPost.length; i++) {
			this.todosLosPostTraducidos.push({
				categoria: this.todosLosPost[i].categoria,
				componente: this.todosLosPost[i].componente,
				descripcion: this.todosLosPost[i].descripcion,
				descripcionCorta: await this.traducirReferencia(this.todosLosPost[i].descripcionCorta),
				estado: this.todosLosPost[i].estado,
				estilos: this.todosLosPost[i].estilos,
				fechaActualizacion: this.todosLosPost[i].fechaActualizacion,
				fechaCreacion: this.todosLosPost[i].fechaCreacion,
				id: this.todosLosPost[i].id,
				imgCuadro: this.todosLosPost[i].imgCuadro,
				imgHorizontal: this.todosLosPost[i].imgHorizontal,
				imgVertical: this.todosLosPost[i].imgVertical,
				mostrarEnPostHome: this.todosLosPost[i].mostrarEnPostHome,
				nombre: await this.traducirReferencia(this.todosLosPost[i].nombre),
				posicion: this.todosLosPost[i].posicion,
				referenciaBusqueda: await this.traducirReferencia(this.todosLosPost[i].referenciaBusqueda),
				ruta: this.todosLosPost[i].ruta,
				imgSlider: this.todosLosPost[i].imgSlider
			})
		}
	}

	async traducirReferencia(ref: string) {
		try {
			let traduccion = await firstValueFrom(this.translate.get(ref));
			return traduccion;
		} catch {
			return 'NO-TRANSLATE'
		}
	}

}
