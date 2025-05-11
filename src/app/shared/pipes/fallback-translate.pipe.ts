import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Pipe({
	name: 'fallbackTranslate'
})
export class FallbackTranslatePipe implements PipeTransform {
	constructor(private translate: TranslateService) { }

	async transform(value: string): Promise<string> {
		if (!value) return '';

		// Get translate
		const translation = await firstValueFrom(this.translate.get(value));

		// return value if translation is not found
		console.log(translation, "se ejecuto el pipe");
		return typeof(translation) === 'object'? value : translation;
	}
}