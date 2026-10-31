import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IEras } from '../../models/experience.model';
import { EXPERIENCE } from '../../constants/experience.constant';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll-animate.directive';
import { SplitTextComponent } from '../../../shared/components/split-text/split-text.component';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [TranslateModule, CommonModule, RevealDirective, ScrollAnimateDirective, SplitTextComponent],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.css'
})
export class ExperienceComponent {
    EXPERIENCES: IEras[] = EXPERIENCE;

    constructor(public translate: TranslateService) {
        this.translate.addLangs(['fr', 'en', 'es']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
    }
}
