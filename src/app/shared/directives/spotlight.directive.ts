import { afterNextRender, DestroyRef, Directive, ElementRef, NgZone } from '@angular/core';

/**
 * Expone la posición del puntero dentro del elemento como `--mx` / `--my` (en px)
 * para pintar un foco de luz que lo sigue con CSS (`radial-gradient(at var(--mx) var(--my), …)`).
 */
@Directive({
	selector: '[appSpotlight]'
})
export class SpotlightDirective {

	constructor(elementRef: ElementRef<HTMLElement>, ngZone: NgZone, destroyRef: DestroyRef) {
		afterNextRender(() => {
			const elemento = elementRef.nativeElement;
			const mover = (evento: PointerEvent) => {
				const caja = elemento.getBoundingClientRect();
				elemento.style.setProperty('--mx', `${evento.clientX - caja.left}px`);
				elemento.style.setProperty('--my', `${evento.clientY - caja.top}px`);
			};

			ngZone.runOutsideAngular(() => elemento.addEventListener('pointermove', mover));
			destroyRef.onDestroy(() => elemento.removeEventListener('pointermove', mover));
		});
	}

}
