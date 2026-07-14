import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'app-form-contact',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './form-contact.component.html',
    styleUrl: './form-contact.component.css'
})
export class FormContactComponent {
    contactForm: FormGroup;
    sending = false;
    sent = false;

    constructor(private fb: FormBuilder, private contactService: ContactService) {
        this.contactForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            comments: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    onSubmit() {
        if (this.contactForm.invalid) return;
        this.sending = true;
        const { email, comments } = this.contactForm.value;
        this.contactService.sendContactEmail(email, comments)
            .then(() => {
                this.sent = true;
                this.contactForm.reset();
                this.sending = false;
            })
            .catch(() => {
                this.sending = false;
            });
    }
}
