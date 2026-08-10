import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
    active = true;

    constructor(
        public translate: TranslateService,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        this.translate.addLangs(['fr', 'en', 'es']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            AOS.init();
        }
    }
}
