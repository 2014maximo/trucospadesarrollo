import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { IFrasesModel } from '../../models/phrases.model';
import { PHRASES } from './constants/phrases.constant';

export type PhrasesEstado = 'cargando' | 'listo' | 'error';

type TypePhase = 'phrase' | 'author' | 'wait' | 'delete';

@Component({
  selector: 'app-phrases',
  imports: [TranslateModule, CommonModule],
  templateUrl: './phrases.component.html',
  styleUrl: './phrases.component.css'
})
export class PhrasesComponent implements OnInit {

  estado: PhrasesEstado = 'cargando';
  frases: IFrasesModel[] = [];
  displayPhrase = '';
  displayAuthor = '';
  currentPhraseIndex = 0;
  charIndex = 0;
  colorAuthor = '';

  private typePhase: TypePhase = 'phrase';

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.inicializarVariables();
  }

  private inicializarVariables(): void {
    this.procesarCargarFrases();
  }

  async procesarCargarFrases(): Promise<void> {
    try {
      const traducciones = await Promise.all(
        PHRASES.map(async (p) => ({
          frase: await firstValueFrom(this.translate.get(p.frase)),
          autor: await firstValueFrom(this.translate.get(p.autor)),
          borde: p.borde,
          colorText: p.colorText,
          id: p.id,
        }))
      );

      this.frases = traducciones.sort((a, b) => Math.random() - 0.5);

      if (this.frases.length > 0 && isPlatformBrowser(this.platformId)) {
        this.typeNext();
      }

      this.estado = 'listo';
    } catch {
      this.estado = 'error';
    }
  }

  typeNext(): void {
    const current = this.frases[this.currentPhraseIndex];

    switch (this.typePhase) {
      case 'phrase':
        if (this.charIndex < current.frase.length) {
          this.displayPhrase += current.frase[this.charIndex];
          this.colorAuthor = current.colorText;
          this.charIndex++;
          setTimeout(() => this.typeNext(), 100);
        } else {
          this.typePhase = 'author';
          this.charIndex = 0;
          this.typeNext();
        }
        break;

      case 'author':
        if (this.charIndex < current.autor.length) {
          this.displayAuthor += current.autor[this.charIndex];
          this.charIndex++;
          setTimeout(() => this.typeNext(), 100);
        } else {
          this.typePhase = 'wait';
          setTimeout(() => this.typeNext(), 20000);
        }
        break;

      case 'wait':
        this.typePhase = 'delete';
        this.typeNext();
        break;

      case 'delete':
        if (this.displayAuthor.length > 0) {
          this.displayAuthor = this.displayAuthor.slice(0, -1);
          setTimeout(() => this.typeNext(), 50);
        } else if (this.displayPhrase.length > 0) {
          this.displayPhrase = this.displayPhrase.slice(0, -1);
          setTimeout(() => this.typeNext(), 50);
        } else {
          this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.frases.length;
          this.typePhase = 'phrase';
          this.charIndex = 0;
          setTimeout(() => this.typeNext(), 500);
        }
        break;
    }
  }

}
