import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, Inject, Input, NgZone, OnChanges, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { animate, AnimationPlaybackControls, hover, inView } from 'motion';
import { prefiereMovimientoReducido } from '../../directives/motion-utils';

/**
 * Palabra que va cambiando por la siguiente de la lista (sale hacia arriba y entra desde abajo con muelle)
 * y se queda en la última. Se reproduce una vez al entrar en pantalla y otra vez al pasar el puntero.
 * La secuencia dura menos de 5 s (WCAG 2.2.2). En servidor y con `prefers-reduced-motion` solo se ve la última palabra.
 * Es decorativa: quien la use debe ofrecer el texto final a los lectores de pantalla.
 */
@Component({
	selector: 'app-word-rotator',
	template: `<span #palabra class="wr-palabra"></span>`,
	styles: `:host { display: inline-block; } .wr-palabra { display: inline-block; }`
})
export class WordRotatorComponent implements OnChanges, AfterViewInit {

	@Input({ required: true }) palabras: string[] = [];
	/** Segundos que se ve cada palabra intermedia. */
	@Input() pausa: number = 0.45;

	@ViewChild('palabra', { static: true }) palabra!: ElementRef<HTMLElement>;

	private reproduciendo = false;
	private destruido = false;
	private animacion?: AnimationPlaybackControls;
	private limpiezas: VoidFunction[] = [];

	constructor(
		private renderer: Renderer2,
		private ngZone: NgZone,
		private host: ElementRef<HTMLElement>,
		@Inject(PLATFORM_ID) private platformId: object,
		destroyRef: DestroyRef
	) {
		destroyRef.onDestroy(() => {
			this.destruido = true;
			this.animacion?.stop();
			this.limpiezas.forEach(limpiar => limpiar());
		});
	}

	ngOnChanges(): void {
		// Si cambia la lista (p. ej. de idioma) se muestra directamente la palabra final
		if (!this.reproduciendo) {
			this.pintar(this.palabras[this.palabras.length - 1] ?? '');
		}
	}

	ngAfterViewInit(): void {
		if (!isPlatformBrowser(this.platformId) || prefiereMovimientoReducido() || this.palabras.length < 2) {
			return;
		}

		this.ngZone.runOutsideAngular(() => {
			const quitarInView = inView(this.host.nativeElement, () => {
				this.reproducir();
			}, { amount: 0.6 });
			const quitarHover = hover(this.host.nativeElement, () => {
				this.reproducir();
			});
			this.limpiezas.push(quitarInView, quitarHover);
		});
	}

	private async reproducir(): Promise<void> {
		if (this.reproduciendo) {
			return;
		}
		this.reproduciendo = true;
		const elemento = this.palabra.nativeElement;

		for (const [i, texto] of this.palabras.entries()) {
			if (this.destruido) {
				return;
			}
			if (i > 0) {
				await this.esperar(this.pausa);
				this.animacion = animate(elemento, { y: ['0em', '-0.35em'], opacity: [1, 0] }, { duration: 0.18, ease: 'easeIn' });
				await this.animacion.finished;
			}
			this.pintar(texto);
			this.animacion = animate(elemento, { y: ['0.35em', '0em'], opacity: [0, 1] }, { type: 'spring', bounce: 0.45, duration: 0.5 });
			await this.animacion.finished;
		}
		this.reproduciendo = false;
	}

	private esperar(segundos: number): Promise<void> {
		return new Promise(resolver => setTimeout(resolver, segundos * 1000));
	}

	private pintar(texto: string): void {
		this.renderer.setProperty(this.palabra.nativeElement, 'textContent', texto);
	}

}
