import { Component, Input } from '@angular/core';
import { FirstDescriptionBlockModel } from '../../models/first-description-block.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { abrirUrl } from '@shared//global-functions';

@Component({
	selector: 'app-first-description-block',
	imports: [
		TranslateModule,
		CommonModule
	],
	templateUrl: './first-description-block.component.html',
	styleUrl: './first-description-block.component.css'
})
export class FirstDescriptionBlockComponent {

	@Input() content: FirstDescriptionBlockModel[] = [];
	@Input() categoryColor: string = '';
	@Input() ref: string = '';

	constructor(private translate: TranslateService) {
		translate.setDefaultLang('es');
		translate.use('es');
		console.log(this.ref, 'ref');
	}

	public openLink(url: string, blank: true) {
		abrirUrl(url, blank)
	}

	public controlUndefined(value: string | undefined, defaultValue: string = ''): string {
		const textToTranslate = value ?? defaultValue;
		const textReturn = this.translate.instant(textToTranslate);

		return textReturn.includes('.')? '': textReturn;
	}

}
