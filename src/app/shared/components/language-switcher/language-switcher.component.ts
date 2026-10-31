import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TraduccionService } from '../../services/traduccion.service';

@Component({
    selector: 'app-language-switcher',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './language-switcher.component.html',
    styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
    public idiomaActual: string = '';
    public lenguajes: string[] = ['es', 'en', 'fr'];
    /** Nombre de cada idioma en su propia lengua, para el menú y el lector de pantalla. */
    public readonly nombres: Record<string, string> = { es: 'Español', en: 'English', fr: 'Français' };

    @ViewChild('selector') selector!: ElementRef<HTMLButtonElement>;

    constructor(
        private translate: TranslateService,
        private traduccion: TraduccionService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        if (isPlatformBrowser(this.platformId)) {
            const browserLang = navigator.language.split('-')[0];
            this.idiomaActual = localStorage.getItem('idioma') ?? browserLang;
        } else {
            this.idiomaActual = 'es';
        }

        this.translate.setDefaultLang('es');
        this.translate.use(this.idiomaActual);
        this.translate.addLangs(['es', 'en', 'fr']);
        this.cargarListaLenguajes(this.idiomaActual);
    }

    public procesoCambioLenguaje(lenguaje: string): void {
        localStorage.setItem('idioma', lenguaje);
        this.idiomaActual = lenguaje;
        this.traduccion.cambiarIdioma(lenguaje);
        this.cargarListaLenguajes(lenguaje);
        // La opción elegida desaparece de la lista: el foco vuelve al botón para no perderse en <body>
        this.selector.nativeElement.focus();
    }

    private cargarListaLenguajes(actual: string): void {
        this.lenguajes = ['es', 'en', 'fr'];
        const indice = this.lenguajes.indexOf(actual);
        if (indice !== -1) {
            this.lenguajes = this.lenguajes.slice(0, indice).concat(this.lenguajes.slice(indice + 1));
        }
    }
}
