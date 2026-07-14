import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactPayload {
    email: string;
    comentarios: string;
    /** Campo honeypot anti-spam: debe llegar siempre vacío. */
    website: string;
}

interface ContactResponse {
    success: boolean;
    message?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private readonly endpoint = environment.contactApi;

    constructor(private http: HttpClient) {}

    enviarMensaje(payload: ContactPayload): Promise<ContactResponse> {
        return firstValueFrom(this.http.post<ContactResponse>(this.endpoint, payload));
    }
}
