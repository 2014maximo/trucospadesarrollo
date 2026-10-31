import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, DestroyRef, Directive, ElementRef, Inject, Input, NgZone, PLATFORM_ID } from '@angular/core';
import { animate, AnimationPlaybackControls, hover } from 'motion';
import { prefiereMovimientoReducido } from './motion-utils';

/**
 * Cinta infinita: desplaza en bucle una pista que contiene su contenido duplicado (dos copias seguidas),
 * de modo que al avanzar un 50 % el salto no se nota. Se frena al pasar el puntero por el contenedor padre.
 * Con `prefers-reduced-motion` no se anima y añade la clase `marquee-estatico` para que el CSS la muestre quieta.
 */
@Directive({
	selector: '[appMarquee]'
})
export class MarqueeDirective implements AfterViewInit {

	/** Segundos que tarda en recorrer una copia completa. */
	@Input() marqueeDuracion: number = 60;
	/** Desplaza hacia la derecha en lugar de hacia la izquierda. */
	@Input() marqueeInversa: boolean = false;
	/** Velocidad relativa mientras el puntero está encima. */
	@Input() marqueeVelocidadHover: number = 0.2;

	private animacion?: AnimationPlaybackControls;
	private quitarHover?: VoidFunction;

	constructor(
		private elementRef: ElementRef<HTMLElement>,
		private ngZone: NgZone,
		@Inject(PLATFORM_ID) private platformId: object,
		destroyRef: DestroyRef
	) {
		destroyRef.onDestroy(() => {
			this.animacion?.stop();
			this.quitarHover?.();
		});
	}

	ngAfterViewInit(): void {
		if (!isPlatformBrowser(this.platformId)) {
			return;
		}

		const pista = this.elementRef.nativeElement;
		if (prefiereMovimientoReducido()) {
			pista.classList.add('marquee-estatico');
			return;
		}

		this.ngZone.runOutsideAngular(() => {
			const animacion = animate(
				pista,
				{ x: this.marqueeInversa ? ['-50%', '0%'] : ['0%', '-50%'] },
				{ duration: this.marqueeDuracion, ease: 'linear', repeat: Infinity }
			);
			this.animacion = animacion;
			this.quitarHover = hover(pista.parentElement ?? pista, () => {
				animacion.speed = this.marqueeVelocidadHover;
				return () => animacion.speed = 1;
			});
		});
	}

}
