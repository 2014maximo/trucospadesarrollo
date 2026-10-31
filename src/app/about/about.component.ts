import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollAnimateDirective } from '../shared/directives/scroll-animate.directive';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HobbiesComponent } from './components/hobbies/hobbies.component';
import { FromBlogComponent } from './components/from-blog/from-blog.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-about',
    imports: [TranslateModule, ScrollAnimateDirective, ContactMeComponent, SkillsComponent, ExperienceComponent, ProjectsComponent, HobbiesComponent, FromBlogComponent, TestimonialsComponent, FooterComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent {
    scroll(el: HTMLElement) {
        el.scrollIntoView();
    }
}
