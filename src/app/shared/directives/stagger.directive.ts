import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, DestroyRef, Directive, ElementRef, Inject, Input, NgZone, PLATFORM_ID } from '@angular/core';
import { animate, AnimationPlaybackControls, inView, stagger } from 'motion';
import { limpiarEstilosEnLinea, prefiereMovimientoReducido } from './motion-utils';

/**
 * Hace aparecer los hijos del elemento uno tras otro (con muelle) la primera vez que el contenedor entra en pantalla.
 * Solo se ejecuta en navegador y respeta `prefers-reduced-motion`.
 */
@Directive({
	selector: '[appStagger]'
})
export class StaggerDirective implements AfterViewInit {

	/** Selector de los elementos a animar, relativo al contenedor. */
	@Input() staggerHijos: string = ':scope > *';
	/** Segundos entre un elemento y el siguiente. */
	@Input() staggerIntervalo: number = 0.08;
	/** Desplazamiento vertical inicial en px. */
	@Input() staggerDistancia: number = 32;

	private detenerObservador?: VoidFunction;
	private animacion?: AnimationPlaybackControls;

	constructor(
		private elementRef: ElementRef<HTMLElement>,
		private ngZone: NgZone,
		@Inject(PLATFORM_ID) private platformId: object,
		destroyRef: DestroyRef
	) {
		destroyRef.onDestroy(() => {
			this.detenerObservador?.();
			this.animacion?.stop();
		});
	}

	ngAfterViewInit(): void {
		if (!isPlatformBrowser(this.platformId) || prefiereMovimientoReducido()) {
			return;
		}

		const contenedor = this.elementRef.nativeElement;
		const hijos = Array.from(contenedor.querySelectorAll<HTMLElement>(this.staggerHijos));
		hijos.forEach(hijo => hijo.style.opacity = '0');

		this.ngZone.runOutsideAngular(() => {
			this.detenerObservador = inView(contenedor, () => {
				this.animacion = animate(
					hijos,
					{ opacity: [0, 1], y: [this.staggerDistancia, 0] },
					{ type: 'spring', bounce: 0.3, duration: 0.8, delay: stagger(this.staggerIntervalo) }
				);
				// Al terminar se devuelven los estilos al CSS para no bloquear transformaciones de :hover
				this.animacion.finished.then(() => hijos.forEach(limpiarEstilosEnLinea));
			}, { amount: 0.15 });
		});
	}

}
