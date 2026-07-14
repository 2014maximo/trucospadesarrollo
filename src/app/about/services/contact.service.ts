import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private readonly SERVICE_ID = 'YOUR_SERVICE_ID';
    private readonly TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    private readonly PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    constructor() {
        emailjs.init(this.PUBLIC_KEY);
    }

    sendContactEmail(email: string, message: string): Promise<unknown> {
        const templateParams = {
            from_email: email,
            message: message
        };

        return emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams);
    }
}
