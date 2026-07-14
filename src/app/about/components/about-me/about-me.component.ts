import { Component, OnInit, OnDestroy, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';
import { Subscription } from 'rxjs';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
    selector: 'app-about-me',
    standalone: true,
    imports: [TranslateModule, CommonModule],
    templateUrl: './about-me.component.html',
    styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements OnInit, OnDestroy {
    @Output() contactClick = new EventEmitter<void>();
    espanol = true;
    private langChangeSubscription: Subscription | null = null;

    constructor(
        public translate: TranslateService,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        this.translate.setDefaultLang('es');
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            AOS.init();
        }
        this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.espanol = true;
        });
        if (this.translate.currentLang !== this.translate.defaultLang) {
            this.espanol = true;
        } else {
            this.espanol = false;
        }
    }

    ngOnDestroy(): void {
        if (this.langChangeSubscription) {
            this.langChangeSubscription.unsubscribe();
        }
    }

    changeDownload() {
        this.espanol = !this.espanol;
    }

    onContactClick() {
        this.contactClick.emit();
    }
}
