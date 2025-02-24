import { DatosPost } from "@models/categorias.model";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from "rxjs";


export class TraslateForce {

    public idiomaActual: string = '';
    public lenguajes: string[] = ['es', 'en', 'fr'];
    public todosLosPostTraducidos: DatosPost[] = [];
    public todosLosPost: DatosPost[] = [];

    constructor(private translate: TranslateService) {
    }

    public listTranslates(){
        if (localStorage.getItem("idioma")) {
			this.idiomaActual = localStorage.getItem('idioma') ?? '';
		} else {
			this.idiomaActual = navigator.language.split('-')[0];
		}
		this.translate.setDefaultLang(navigator.language.split('-')[0]);
		this.translate.use(this.idiomaActual);
		this.cargarListaLenguajes(this.idiomaActual);
    }

    cargarListaLenguajes(a: string) {
		this.lenguajes = ['es', 'en', 'fr'];

		let indice = this.lenguajes.indexOf(a);
		if (indice !== -1) {
			this.lenguajes = this.lenguajes.slice(0, indice).concat(this.lenguajes.slice(indice + 1));
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