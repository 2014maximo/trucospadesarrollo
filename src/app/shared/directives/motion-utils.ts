/** `true` si el usuario pidió reducir el movimiento: las directivas de animación no deben animar. */
export function prefiereMovimientoReducido(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Quita la opacidad y la transformación que deja una animación de entrada, para que vuelva a mandar el CSS. */
export function limpiarEstilosEnLinea(elemento: HTMLElement): void {
	elemento.style.removeProperty('opacity');
	elemento.style.removeProperty('transform');
}
