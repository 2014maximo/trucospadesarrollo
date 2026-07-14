import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';
import { IEras } from '../../models/experience.model';
import { EXPERIENCE } from '../../constants/experience.constant';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [TranslateModule, CommonModule],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
    EXPERIENCES: IEras[] = EXPERIENCE;

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

    public itsEvenNumber(numero: number): boolean {
        return (numero % 2) === 0;
    }
}
