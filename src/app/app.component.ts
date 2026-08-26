import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieConsentService } from './shared/services/cookie-consent.service';
import { CookieConsentBannerComponent } from './shared/components/cookie-consent-banner/cookie-consent-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CookieConsentBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trucospadesarrollo';

  constructor(public cookieConsentService: CookieConsentService) {}
}
