import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-home',
  imports: [ReactiveFormsModule,
            CommonModule,
            TranslateModule,
            FormsModule
          ],
  templateUrl: './footer-home.component.html',
  styleUrl: './footer-home.component.css'
})
export class FooterHomeComponent {
   formContact: FormGroup;

  constructor(private fb: FormBuilder, /* private database: ContactFormService, */ public translate: TranslateService){
    translate.setDefaultLang(navigator.language.split('-')[0]);
    this.formContact = this.fb.group({
      email:['', [Validators.required]],
      comentarios: ['', [Validators.required]]
    });
  }

  enviar(){
    
  }

}
