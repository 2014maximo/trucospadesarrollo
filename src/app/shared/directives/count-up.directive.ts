import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, DestroyRef, Directive, ElementRef, Inject, Input, NgZone, OnChanges, PLATFORM_ID, Renderer2 } from '@angular/core';
import { animate, AnimationPlaybackControls, inView } from 'motion';
import { prefiereMovimientoReducido } from './motion-utils';

/**
 * Pinta un número y, en navegador, lo cuenta desde 0 la primera vez que entra en pantalla.
 * En servidor (y con `prefers-reduced-motion`) se muestra directamente el valor final.
 */
@Directive({
	selector: '[appCountUp]'
})
export class CountUpDirective implements OnChanges, AfterViewInit {

	@Input({ required: true }) appCountUp!: number;
	/** Texto añadido tras el número, p. ej. `+`. */
	@Input() countUpSufijo: string = '';
	/** Duración en segundos. */
	@Input() countUpDuracion: number = 1.6;

	private detenerObservador?: VoidFunction;
	private animacion?: AnimationPlaybackControls;

	constructor(
		private elementRef: ElementRef<HTMLElement>,
		private renderer: Renderer2,
		private ngZone: NgZone,
		@Inject(PLATFORM_ID) private platformId: object,
		destroyRef: DestroyRef
	) {
		destroyRef.onDestroy(() => {
			this.detenerObservador?.();
			this.animacion?.stop();
		});
	}

	ngOnChanges(): void {
		this.pintar(this.appCountUp);
	}

	ngAfterViewInit(): void {
		if (!isPlatformBrowser(this.platformId) || prefiereMovimientoReducido()) {
			return;
		}

		this.pintar(0);
		this.ngZone.runOutsideAngular(() => {
			this.detenerObservador = inView(this.elementRef.nativeElement, () => {
				this.animacion = animate(0, this.appCountUp, {
					duration: this.countUpDuracion,
					ease: [0.16, 1, 0.3, 1],
					onUpdate: valor => this.pintar(valor)
				});
			});
		});
	}

	private pintar(valor: number): void {
		this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', `${Math.round(valor)}${this.countUpSufijo}`);
	}

}
