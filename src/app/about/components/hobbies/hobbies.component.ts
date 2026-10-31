import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { SplitTextComponent } from '../../../shared/components/split-text/split-text.component';
import { StaggerDirective } from '../../../shared/directives/stagger.directive';

@Component({
    selector: 'app-hobbies',
    standalone: true,
    imports: [TranslateModule, RevealDirective, SplitTextComponent, StaggerDirective],
    templateUrl: './hobbies.component.html',
    styleUrl: './hobbies.component.css'
})
export class HobbiesComponent {
    constructor(public translate: TranslateService) {
        this.translate.addLangs(['fr', 'en', 'es']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
    }
}
