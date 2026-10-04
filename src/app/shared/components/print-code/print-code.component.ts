import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { copiarAlPortapapeles, abrirUrl } from '@shared//global-functions';

import 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-cshtml';

import { CodeModel } from '../../models/print-code.model';

declare var Prism: any;

@Component({
	selector: 'app-print-code',
	imports: [CommonModule],
	templateUrl: './print-code.component.html',
	styleUrl: './print-code.component.css'
})
export class PrintCodeComponent implements OnInit {

	@Input() code: string = '';
	@Input() ObjectCode: CodeModel[] = [];
	@Input() refDocumentacion: string = '';
	@Input() urlStackBlitz: string = '';
	@Input() lineas: number = 0;
	@Input() lenguaje: string = '';
	@Input() colorTextoBase: string = '';
	@Input() categoriaCorta: string = '';
	@Input() tipoCode: string = 'lenguajes';

	clipboard: string = '';

	constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

	ngOnInit(): void {
		this.clipboard = this.code ? this.code : (this.ObjectCode[0]?.code ?? '');

		if (isPlatformBrowser(this.platformId)) {
			Prism.highlightAll();
		}
	}

	public contador(iteraciones: number) {
		return Array(iteraciones).fill(0).map((_, index) => index);
	}

	public copiarAlPortapapeles(cadenaAlclipboard: string) {
		copiarAlPortapapeles(cadenaAlclipboard);
	}

	public abrirLink(link: string) {
		abrirUrl(link, true);
	}

}
