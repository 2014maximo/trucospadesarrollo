import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ContactFormComponent } from '../../../shared/components/contact-form/contact-form.component';
import * as AOS from 'aos';

@Component({
    selector: 'app-contact-me',
    standalone: true,
    imports: [TranslateModule, CommonModule, AboutMeComponent, ContactFormComponent],
    templateUrl: './contact-me.component.html',
    styleUrl: './contact-me.component.css'
})
export class ContactMeComponent implements OnInit {
    defaultLanguage = 'es';
    flipped = false;

    constructor(
        public translate: TranslateService,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        this.translate.addLangs(['en', 'es']);
        this.translate.setDefaultLang('es');
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            AOS.init();
        }
    }

    changeLanguage(language: string) {
        this.translate.use(language);
        this.defaultLanguage = language;
    }

    flip() {
        this.flipped = !this.flipped;
    }
}
