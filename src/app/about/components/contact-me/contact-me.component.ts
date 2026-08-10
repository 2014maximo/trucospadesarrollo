import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ContactFormComponent } from '../../../shared/components/contact-form/contact-form.component';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import * as AOS from 'aos';

@Component({
    selector: 'app-contact-me',
    standalone: true,
    imports: [TranslateModule, CommonModule, AboutMeComponent, ContactFormComponent, LanguageSwitcherComponent],
    templateUrl: './contact-me.component.html',
    styleUrl: './contact-me.component.css'
})
export class ContactMeComponent implements OnInit {
    flipped = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: object
    ) {}

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            AOS.init();
        }
    }

    flip() {
        this.flipped = !this.flipped;
    }
}
