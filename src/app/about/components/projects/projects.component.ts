import { Component } from '@angular/core';
import { PROJECTS } from '../../constants/project.constants';
import { IProject } from '../../models/project.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [TranslateModule, CommonModule],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css'
})
export class ProjectsComponent {
    projects: IProject[] = PROJECTS;

    constructor(public translate: TranslateService) {}
}
