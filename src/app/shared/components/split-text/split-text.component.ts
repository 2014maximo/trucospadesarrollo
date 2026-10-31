import { afterNextRender, Component, DestroyRef, ElementRef, Input, NgZone } from '@angular/core';
import { animate, AnimationPlaybackControls, inView, stagger } from 'motion';
import { prefiereMovimientoReducido } from '../../directives/motion-utils';

/**
 * Texto que entra por letras o por palabras, escalonado y con muelle, al entrar en pantalla.
 * El texto completo queda disponible para lectores de pantalla; los fragmentos son decorativos.
 */
@Component({
	selector: 'app-split-text',
	templateUrl: './split-text.component.html',
	styleUrl: './split-text.component.css'
})
export class SplitTextComponent {

	@Input({ required: true }) texto: string = '';
	@Input() modo: 'letras' | 'palabras' = 'palabras';
	/** Convierte el texto a tipo oración (las claves i18n de títulos están en mayúsculas). */
	@Input() oracion: boolean = false;
	/** Retardo inicial en segundos. */
	@Input() retardo: number = 0;

	private detenerObservador?: VoidFunction;
	private animacion?: AnimationPlaybackControls;

	constructor(elementRef: ElementRef<HTMLElement>, ngZone: NgZone, destroyRef: DestroyRef) {
		afterNextRender(() => {
			if (prefiereMovimientoReducido()) {
				return;
			}

			const host = elementRef.nativeElement;
			host.classList.add('st-oculto');

			ngZone.runOutsideAngular(() => {
				this.detenerObservador = inView(host, () => {
					const unidades = host.querySelectorAll<HTMLElement>('.st-u');
					const intervalo = this.modo === 'letras' ? 0.035 : 0.07;
					this.animacion = animate(
						unidades,
						{ opacity: [0, 1], y: ['0.5em', '0em'], rotate: [6, 0] },
						{ type: 'spring', bounce: 0.35, duration: 0.9, delay: stagger(intervalo, { startDelay: this.retardo }) }
					);
					this.animacion.finished.then(() => host.classList.remove('st-oculto'));
				});
			});
		});

		destroyRef.onDestroy(() => {
			this.detenerObservador?.();
			this.animacion?.stop();
		});
	}

	get textoVisible(): string {
		if (!this.oracion) {
			return this.texto;
		}
		const minusculas = this.texto.toLocaleLowerCase();
		return minusculas.charAt(0).toLocaleUpperCase() + minusculas.slice(1);
	}

	get palabras(): string[] {
		return this.textoVisible.split(' ').filter(Boolean);
	}

	letras(palabra: string): string[] {
		return Array.from(palabra);
	}

}
