import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, DestroyRef, Directive, ElementRef, Inject, Input, NgZone, PLATFORM_ID } from '@angular/core';
import { animate, DOMKeyframesDefinition, scroll } from 'motion';
import { prefiereMovimientoReducido } from './motion-utils';

type ScrollOffset = NonNullable<NonNullable<Parameters<typeof scroll>[1]>['offset']>;

/**
 * Liga una animación al scroll: el progreso de los fotogramas sigue a la posición de la página
 * (o de `scrollTarget` dentro del viewport, según `scrollOffset`).
 * Solo se ejecuta en navegador y respeta `prefers-reduced-motion`.
 */
@Directive({
	selector: '[appScrollAnimate]'
})
export class ScrollAnimateDirective implements AfterViewInit {

	@Input({ required: true }) appScrollAnimate!: DOMKeyframesDefinition;
	/** Elemento cuyo paso por el viewport marca el progreso. Sin él, se usa el scroll de toda la página. */
	@Input() scrollTarget?: HTMLElement;
	/** Puntos de inicio y fin, p. ej. `['start end', 'end start']`. */
	@Input() scrollOffset?: string[];

	private detener?: VoidFunction;

	constructor(
		private elementRef: ElementRef<HTMLElement>,
		private ngZone: NgZone,
		@Inject(PLATFORM_ID) private platformId: object,
		destroyRef: DestroyRef
	) {
		destroyRef.onDestroy(() => this.detener?.());
	}

	ngAfterViewInit(): void {
		if (!isPlatformBrowser(this.platformId) || prefiereMovimientoReducido()) {
			return;
		}

		this.ngZone.runOutsideAngular(() => {
			const animacion = animate(this.elementRef.nativeElement, this.appScrollAnimate, { ease: 'linear' });
			this.detener = scroll(animacion, { target: this.scrollTarget, offset: this.scrollOffset as ScrollOffset | undefined });
		});
	}

}
