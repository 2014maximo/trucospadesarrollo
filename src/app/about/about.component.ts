import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';
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
    imports: [ContactMeComponent, SkillsComponent, ExperienceComponent, ProjectsComponent, HobbiesComponent, FromBlogComponent, TestimonialsComponent, FooterComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
    constructor(@Inject(PLATFORM_ID) private platformId: object) {}

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            AOS.init();
        }
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView();
    }
}
