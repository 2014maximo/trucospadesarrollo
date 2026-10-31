import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ContactFormComponent } from '../../../shared/components/contact-form/contact-form.component';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { StaggerDirective } from '../../../shared/directives/stagger.directive';
import { CountUpDirective } from '../../../shared/directives/count-up.directive';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll-animate.directive';
import { SplitTextComponent } from '../../../shared/components/split-text/split-text.component';
import { PROJECTS } from '../../constants/project.constants';
import { EXPERIENCE } from '../../constants/experience.constant';

@Component({
    selector: 'app-contact-me',
    standalone: true,
    imports: [TranslateModule, CommonModule, AboutMeComponent, ContactFormComponent, LanguageSwitcherComponent, RevealDirective, StaggerDirective, CountUpDirective, ScrollAnimateDirective, SplitTextComponent],
    templateUrl: './contact-me.component.html',
    styleUrl: './contact-me.component.css'
})
export class ContactMeComponent {
    flipped = false;
    readonly anios = 5;
    readonly proyectos = PROJECTS.length;
    readonly experiencias = EXPERIENCE.reduce((total, era) => total + era.experience.length, 0);

    @ViewChild('frente') frente!: ElementRef<HTMLElement>;
    @ViewChild('cerrar') cerrar!: ElementRef<HTMLButtonElement>;

    flip() {
        this.flipped = !this.flipped;
        // La cara oculta queda `inert`: se mueve el foco a la cara visible tras actualizar la vista
        setTimeout(() => (this.flipped ? this.cerrar : this.frente).nativeElement.focus());
    }
}
