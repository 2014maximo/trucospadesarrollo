import { afterNextRender, DestroyRef, Directive, ElementRef, Input, NgZone } from '@angular/core';
import { animate, AnimationPlaybackControls, inView } from 'motion';
import { limpiarEstilosEnLinea, prefiereMovimientoReducido } from './motion-utils';

export type RevealDesde = 'abajo' | 'izquierda' | 'derecha';

/**
 * Hace aparecer el elemento (opacidad + desplazamiento) la primera vez que entra en pantalla.
 * Si se desplaza en horizontal, el contenedor debe recortar el desbordamiento (`overflow-x: clip`).
 * Solo se ejecuta en navegador (`afterNextRender`) y respeta `prefers-reduced-motion`.
 */
@Directive({
	selector: '[appReveal]'
})
export class RevealDirective {

	/** Lado desde el que entra el elemento. */
	@Input() revealDesde: RevealDesde = 'abajo';
	/** Desplazamiento inicial en px. */
	@Input() revealDistancia: number = 24;
	/** Retardo en segundos antes de iniciar la animación. */
	@Input() revealRetardo: number = 0;
	/** Duración en segundos. */
	@Input() revealDuracion: number = 0.5;

	private detenerObservador?: VoidFunction;
	private animacion?: AnimationPlaybackControls;

	constructor(elementRef: ElementRef<HTMLElement>, ngZone: NgZone, destroyRef: DestroyRef) {
		afterNextRender(() => {
			if (prefiereMovimientoReducido()) {
				return;
			}

			const elemento = elementRef.nativeElement;
			elemento.style.opacity = '0';

			ngZone.runOutsideAngular(() => {
				this.detenerObservador = inView(elemento, () => {
					this.animacion = animate(
						elemento,
						{ opacity: [0, 1], ...this.desplazamiento() },
						{ duration: this.revealDuracion, delay: this.revealRetardo, ease: 'easeOut' }
					);
					this.animacion.finished.then(() => limpiarEstilosEnLinea(elemento));
				}, { amount: 0.15 });
			});
		});

		destroyRef.onDestroy(() => {
			this.detenerObservador?.();
			this.animacion?.stop();
		});
	}

	private desplazamiento() {
		switch (this.revealDesde) {
			case 'izquierda': return { x: [-this.revealDistancia, 0] };
			case 'derecha': return { x: [this.revealDistancia, 0] };
			default: return { y: [this.revealDistancia, 0] };
		}
	}

}
