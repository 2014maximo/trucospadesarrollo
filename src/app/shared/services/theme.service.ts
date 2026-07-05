import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

/**
 * Gestiona el tema visual (light/dark) de la aplicación.
 *
 * - Por defecto inicia en `'dark'` para mantener el comportamiento histórico.
 * - En el navegador persiste la elección en `localStorage` y refleja el tema
 *   en el atributo `data-bs-theme` del elemento `<html>` para integración con
 *   CSS global / Bootstrap.
 * - En SSR siempre arranca en `'dark'` sin tocar el DOM.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private static readonly STORAGE_KEY = 'theme';

  private readonly _theme = signal<Theme>('dark');

  /** Tema activo actual como signal de solo lectura. */
  readonly theme = this._theme.asReadonly();

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    const inicial = this.leerTemaInicial();
    this._theme.set(inicial);
    if (isPlatformBrowser(this.platformId)) {
      this.aplicarTema(inicial);
    }
  }

  /** Cambia al tema indicado, lo persiste y lo aplica al DOM. */
  setTheme(theme: Theme): void {
    this._theme.set(theme);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(ThemeService.STORAGE_KEY, theme);
      } catch {
        /* almacenamiento no disponible: se ignora silenciosamente */
      }
      this.aplicarTema(theme);
    }
  }

  /** Alterna entre light y dark. */
  toggle(): void {
    this.setTheme(this._theme() === 'dark' ? 'light' : 'dark');
  }

  /** Devuelve `true` si el tema activo es `dark`. */
  get isDark(): boolean {
    return this._theme() === 'dark';
  }

  private leerTemaInicial(): Theme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'dark';
    }
    try {
      const guardado = localStorage.getItem(ThemeService.STORAGE_KEY);
      if (guardado === 'light' || guardado === 'dark') {
        return guardado;
      }
    } catch {
      /* localStorage no disponible */
    }
    return 'dark';
  }

  private aplicarTema(theme: Theme): void {
    const root = document.documentElement;
    root.setAttribute('data-bs-theme', theme);
    root.setAttribute('data-theme', theme);
  }
}