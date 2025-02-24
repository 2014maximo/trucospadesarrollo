import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TOP_FRAMEWORKS } from './constants/frameworks.constant';
import { CommonModule } from '@angular/common';
import { TOP_LANGUAGE } from './constants/languages.constant';
import { TOP_DATABASES } from './constants/databases.constant';
import { TOP_IDES } from './constants/ides.constant';

@Component({
  selector: 'app-top-tecnology',
  imports: [TranslateModule, CommonModule],
  templateUrl: './top-tecnology.component.html',
  styleUrl: './top-tecnology.component.css'
})
export class TopTecnologyComponent {

  frameworks = TOP_FRAMEWORKS;
  languages = TOP_LANGUAGE;
  databases = TOP_DATABASES;
  ides = TOP_IDES;
  widthScreen = window.innerWidth;

}
