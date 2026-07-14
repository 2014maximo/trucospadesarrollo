import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ITestimonial } from '../../models/testimonial.model';
import { TESTIMONIALS } from '../../constants/testimonial.constant';

@Component({
    selector: 'app-testimonials',
    standalone: true,
    imports: [TranslateModule, CommonModule],
    templateUrl: './testimonials.component.html',
    styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
    TESTIMONIALS: ITestimonial[] = TESTIMONIALS;

    constructor(public translate: TranslateService) {
        this.translate.addLangs(['fr', 'en', 'es']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
    }
}
