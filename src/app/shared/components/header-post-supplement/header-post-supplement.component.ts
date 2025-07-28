import { Component, Input } from '@angular/core';
import { DatosPost } from '@models/categorias.model';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { TraduccionService } from '../../services/traduccion.service';
import { TranslateService } from '@ngx-translate/core';
import { datosCategoria, postActual, textoAFecha } from '@shared//global-functions';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-header-post-supplement',
  imports: [DatePipe, CommonModule],
  templateUrl: './header-post-supplement.component.html',
  styleUrl: './header-post-supplement.component.css'
})
export class HeaderPostSupplementComponent {

	@Input() idPublicacion: string = '';
	@Input() rutaIconoSugerido: string = '';

	public publicacion = new DatosPost();
	public titulo:string = '';
	public descripcion:string[]=[];
	public ondestroy$: Subject<boolean> = new Subject();

	constructor(public translate: TranslateService, public traduccion: TraduccionService) {
		// translate.setDefaultLang(navigator.language.split('-')[0]);
	}

	async ngOnInit() {
		this.inicializarVariables();
		await this.contenidoEncabezado();
		this.traduccion.cambioIdioma$.pipe(takeUntil(this.ondestroy$)).subscribe((idioma) => {
			this.contenidoEncabezado();
		})
	}

	ngOnDestroy() {
		this.ondestroy$.next(true);
	}

	async contenidoEncabezado(){
		this.descripcion = [];
		this.translate.get(this.publicacion.nombre).pipe(takeUntil(this.ondestroy$)).subscribe((translated: any) => {
			this.titulo = translated
		});
		if(this.publicacion){
			let cantTxts = this.publicacion.descripcion.length;
			for(let i=0; i < cantTxts; i++){
				let tx = await this.cargarDescripcion(this.publicacion.descripcion[i])
				this.descripcion.push(tx);
			}
		}
	}

	async cargarDescripcion(e:string){
		try{
			return await firstValueFrom(this.translate.get(e));
		} catch(e) {
			console.error(e);
		}
	}

	public extraerDatoCategoria(categoria: string, referencia: number): any {
		return datosCategoria(categoria, referencia)
	}

	private inicializarVariables() {
		this.publicacion = (postActual(this.idPublicacion))[0];
	}

	public fechaAString(fecha: Date): string {
		return new Date(fecha).toISOString().slice(0, 10);
	}

	public textoAFecha(fecha: string): Date {
		return textoAFecha(fecha);
	}

}