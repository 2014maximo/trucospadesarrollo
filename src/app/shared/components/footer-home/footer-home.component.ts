import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-footer-home',
  imports: [CommonModule, TranslateModule, ContactFormComponent],
  templateUrl: './footer-home.component.html',
  styleUrl: './footer-home.component.css'
})
export class FooterHomeComponent {

  constructor(public translate: TranslateService){
    translate.setDefaultLang(navigator.language.split('-')[0]);
  }

}
