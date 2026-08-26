import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type CookieCategory = 'essential' | 'analytics' | 'marketing' | 'preferences';

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export const COOKIE_CONSENT_DEFAULTS: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false
};

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {

  private static readonly STORAGE_KEY = 'cookie-consent';

  private readonly _consent = signal<CookieConsent>(COOKIE_CONSENT_DEFAULTS);
  readonly consent = this._consent.asReadonly();

  private readonly _hasGivenConsent = signal<boolean>(false);
  readonly hasGivenConsent = this._hasGivenConsent.asReadonly();

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    const inicial = this.leerConsentimientoInicial();
    this._consent.set(inicial);
    this._hasGivenConsent.set(!!inicial.essential);
    if (isPlatformBrowser(this.platformId)) {
      this.aplicarConsentimiento(inicial);
    }
  }

  /** Obtiene el consentimiento guardado o usa los valores por defecto */
  private leerConsentimientoInicial(): CookieConsent {
    if (!isPlatformBrowser(this.platformId)) {
      return COOKIE_CONSENT_DEFAULTS;
    }
    try {
      const guardado = localStorage.getItem(CookieConsentService.STORAGE_KEY);
      if (guardado) {
        const parseado = JSON.parse(guardado);
        return {
          essential: parseado.essential ?? COOKIE_CONSENT_DEFAULTS.essential,
          analytics: parseado.analytics ?? COOKIE_CONSENT_DEFAULTS.analytics,
          marketing: parseado.marketing ?? COOKIE_CONSENT_DEFAULTS.marketing,
          preferences: parseado.preferences ?? COOKIE_CONSENT_DEFAULTS.preferences,
        };
      }
    } catch {
      /* localStorage no disponible o datos inválidos */
    }
    return COOKIE_CONSENT_DEFAULTS;
  }

  /** Guarda el consentimiento en localStorage y actualiza señales */
  guardarConsentimiento(consent: CookieConsent): void {
    this._consent.set(consent);
    this._hasGivenConsent.set(
      consent.essential || consent.analytics || consent.marketing || consent.preferences
    );
    try {
      localStorage.setItem(CookieConsentService.STORAGE_KEY, JSON.stringify(consent));
    } catch {
      /* almacenamiento no disponible: se ignora silenciosamente */
    }
    this.aplicarConsentimiento(consent);
  }

  /** Marca todas las categorías como true (aceptar todo) */
  aceptarTodo(): void {
    this.guardarConsentimiento({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  }

  /** Marca solo esenciales como true, las demás como false */
  rechazarTodo(): void {
    this.guardarConsentimiento({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  }

  /** Alterna una categoría específica */
  toggleCategoria(categoria: CookieCategory): void {
    const consent = this._consent();
    const nueva = {
      ...consent,
      [categoria]: !consent[categoria],
    };
    this.guardarConsentimiento(nueva);
  }

  /** Verifica si una categoría está activa */
  estaCategoriaActiva(categoria: CookieCategory): boolean {
    return this._consent()[categoria];
  }

  /** Devuelve true si el usuario ha dado algún consentimiento */
  darAlgúnConsentimiento(): boolean {
    return this._hasGivenConsent();
  }

  private aplicarConsentimiento(consent: CookieConsent): void {
    // Permitir que el DOM reaccione via directivas o servicios suscritos
    // Este método está diseñado para ser extensible
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    // Aquí podríamos disparar eventos o actualizar estados en servicios externos
    // Por ejemplo: activateAnalytics(), activateMarketing(), etc.
  }
}