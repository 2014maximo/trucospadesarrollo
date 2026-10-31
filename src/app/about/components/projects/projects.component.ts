import { Component } from '@angular/core';
import { PROJECTS } from '../../constants/project.constants';
import { IProject } from '../../models/project.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SplitTextComponent } from '../../../shared/components/split-text/split-text.component';
import { StaggerDirective } from '../../../shared/directives/stagger.directive';
import { SpotlightDirective } from '../../../shared/directives/spotlight.directive';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [TranslateModule, CommonModule, SplitTextComponent, StaggerDirective, SpotlightDirective],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css'
})
export class ProjectsComponent {
    projects: IProject[] = PROJECTS;

    constructor(public translate: TranslateService) {}
}
