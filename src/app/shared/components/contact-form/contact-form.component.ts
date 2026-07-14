import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, TranslateModule],
    templateUrl: './contact-form.component.html',
    styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
    contactForm: FormGroup;
    enviando = false;
    enviado = false;
    error = false;

    constructor(private fb: FormBuilder, private contactService: ContactService) {
        this.contactForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            comentarios: ['', [Validators.required, Validators.minLength(5)]],
            website: ['']
        });
    }

    enviar(): void {
        if (this.contactForm.invalid || this.enviando) return;

        this.enviando = true;
        this.error = false;
        this.enviado = false;

        const { email, comentarios, website } = this.contactForm.value;
        this.contactService.enviarMensaje({ email, comentarios, website })
            .then(() => {
                this.enviado = true;
                this.contactForm.reset({ email: '', comentarios: '', website: '' });
            })
            .catch(() => {
                this.error = true;
            })
            .finally(() => {
                this.enviando = false;
            });
    }
}
