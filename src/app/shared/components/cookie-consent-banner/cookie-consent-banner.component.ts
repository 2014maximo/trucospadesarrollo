import { Component, OnInit, inject } from '@angular/core';
import { CookieConsentService } from '../../../shared/services/cookie-consent.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-consent-banner',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './cookie-consent-banner.component.html',
  styleUrl: './cookie-consent-banner.component.css'
})
export class CookieConsentBannerComponent implements OnInit {
  public readonly cookieConsent = inject(CookieConsentService);

  ngOnInit(): void {
    // El banner solo se muestra si no hay consentimiento previo
    // La condición *ngIf ya maneja esto en app.component.html
  }

  aceptarTodo(): void {
    this.cookieConsent.aceptarTodo();
  }

  rechazarTodo(): void {
    this.cookieConsent.rechazarTodo();
  }

  personalizar(): void {
    // Este método se llama cuando el usuario abre el panel de configuración
    // La lógica de guardado se maneja en el template al hacer click en "Guardar"
  }
}