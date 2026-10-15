import { Pipe, PipeTransform } from '@angular/core';
import { segmentarCoincidencias, TextSegment } from '../constants/functions/text-search';

/** Devuelve el texto en tramos para pintar las coincidencias con `<mark>` sin usar `innerHTML`. */
@Pipe({
	name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
	transform(value: string | undefined, query: string): TextSegment[] {
		return segmentarCoincidencias(value ?? '', query);
	}
}
