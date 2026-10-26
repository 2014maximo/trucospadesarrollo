import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';
import { ITechnology, ITechnologyGroup } from '../../models/technology.model';
import { TECHNOLOGIES, TECHNOLOGY_GROUPS } from '../../constants/technology.constant';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
    active = true;
    groups: (ITechnologyGroup & { technologies: ITechnology[] })[] = TECHNOLOGY_GROUPS
        .map(group => ({ ...group, technologies: TECHNOLOGIES.filter(tech => tech.category === group.category) }))
        .filter(group => group.technologies.length > 0);

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
