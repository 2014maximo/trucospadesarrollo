import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-hobbies',
    standalone: true,
    imports: [TranslateModule],
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
