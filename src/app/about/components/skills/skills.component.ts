import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ITechnology, ITechnologyGroup } from '../../models/technology.model';
import { TECHNOLOGIES, TECHNOLOGY_GROUPS } from '../../constants/technology.constant';
import { StaggerDirective } from '../../../shared/directives/stagger.directive';
import { MarqueeDirective } from '../../../shared/directives/marquee.directive';
import { SplitTextComponent } from '../../../shared/components/split-text/split-text.component';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule, TranslateModule, StaggerDirective, MarqueeDirective, SplitTextComponent],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.css'
})
export class SkillsComponent {
    groups: (ITechnologyGroup & { technologies: ITechnology[] })[] = TECHNOLOGY_GROUPS
        .map(group => ({ ...group, technologies: TECHNOLOGIES.filter(tech => tech.category === group.category) }))
        .filter(group => group.technologies.length > 0);

    /** Dos filas de la cinta: todas las tecnologías y, en la segunda, en orden inverso. */
    filas: ITechnology[][] = [TECHNOLOGIES, [...TECHNOLOGIES].reverse()];

    constructor(public translate: TranslateService) {
        this.translate.addLangs(['fr', 'en', 'es']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
    }
}
