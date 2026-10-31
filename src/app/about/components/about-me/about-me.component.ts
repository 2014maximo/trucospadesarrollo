import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
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

    constructor(public translate: TranslateService) {
        this.translate.setDefaultLang('es');
    }

    ngOnInit(): void {
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
