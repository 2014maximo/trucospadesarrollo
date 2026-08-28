import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CookieConsentService } from './shared/services/cookie-consent.service';
import { CookieConsentBannerComponent } from './shared/components/cookie-consent-banner/cookie-consent-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CookieConsentBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'trucospadesarrollo';

  constructor(
    public cookieConsentService: CookieConsentService,
    private readonly translate: TranslateService,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  ngOnInit(): void {
    // El <html lang> debe reflejar el idioma real del contenido: lo usan
    // buscadores, lectores de pantalla y el modo lectura/TTS de Chrome.
    this.document.documentElement.lang = this.translate.currentLang || this.translate.defaultLang || 'es';
    this.translate.onLangChange.subscribe(event => {
      this.document.documentElement.lang = event.lang;
    });
  }
}
