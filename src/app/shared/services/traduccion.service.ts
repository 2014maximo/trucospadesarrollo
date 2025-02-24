import { Injectable } from '@angular/core';
import { CATEGORIA } from '@constants/categories.constant';
import { DatosPost } from '@models/categorias.model';

import { TranslateService } from '@ngx-translate/core';

import { Subject, firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TraduccionService {

	public categorias = CATEGORIA;
	public todosLosPost: DatosPost[] = [];
	public todosLosPostTraducidos: DatosPost[] = [];
	public idiomaActual: string = '';
	public lenguajes: string[] = ['es', 'en', 'fr'];

	private cambioIdiomaSubject = new Subject<string>();
	public cambioIdioma$ = this.cambioIdiomaSubject.asObservable();

	constructor(private translate: TranslateService) {
		this.cargarPost();
		this.processTraduction();
	}

	public cambiarIdioma(idioma: string) {
		this.translate.use(idioma);
		this.cambioIdiomaSubject.next(idioma);
	}

	private cargarPost() {
		this.categorias.forEach((e: any, i: number) => {
			e.post.forEach((post: any) => {
				this.todosLosPost.push(post);
			});
			e.subcategorias.forEach((subcat: any) => {
				this.todosLosPost.push(subcat);
			});
		});

		this.traducirColeccion();
	}

	public processTraduction(){
		if (localStorage.getItem("idioma")) {
			this.idiomaActual = localStorage.getItem('idioma') ?? '';
		} else {
			this.idiomaActual = navigator.language.split('-')[0];
		}
		this.translate.setDefaultLang(navigator.language.split('-')[0]);
		this.translate.use(this.idiomaActual);
		this.cargarListaLenguajes(this.idiomaActual);
		this.traducirColeccion();
		console.log('Proceso de traducciones completado');
	}

	async traducirColeccion() {
		for (let i = 0; i < this.todosLosPost.length; i++) {
			let grupo = {
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
			}
			if(this.todosLosPost[i].mostrarEnPostHome){
				this.todosLosPostTraducidos.push(grupo)
			}
		}
		return this.todosLosPostTraducidos;
	}

	cargarListaLenguajes(a: string) {
		this.lenguajes = ['es', 'en', 'fr'];

		let indice = this.lenguajes.indexOf(a);
		if (indice !== -1) {
			this.lenguajes = this.lenguajes.slice(0, indice).concat(this.lenguajes.slice(indice + 1));
		}
	}

	public async traducirReferencia(ref: string):Promise<string> {
		try{
			let traduccion = await firstValueFrom(this.translate.get(ref));
			return traduccion;
		}catch{
			return 'NO-TRASLATE'
		}
	}

}
