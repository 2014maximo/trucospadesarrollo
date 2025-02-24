import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FrasesModel } from '../../models/phrases.model';
import { firstValueFrom, Subject } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PHRASES } from './constants/phrases.constant';
import { CommonModule } from '@angular/common';
import { TraslateForce } from '@shared//traslate-function';
import Typewriter from 'typewriter-effect';

@Component({
  selector: 'app-phrases',
  imports: [TranslateModule, CommonModule],
  templateUrl: './phrases.component.html',
  styleUrl: './phrases.component.css'
})
export class PhrasesComponent implements OnInit {

  public frases: FrasesModel[]=[];
  private ondestroy$: Subject<boolean> = new Subject();
  
  phrases = ['Angular es genial', 'Simula escritura', 'Escribe como humano'];
  displayText = '';
  currentPhraseIndex = 0;
  charIndex = 0;
  author='';
  colorAuthor=''

  constructor(private translate: TranslateService, private el: ElementRef){
    const transla = new TraslateForce(this.translate);
        transla.listTranslates();
  }

  
  ngOnInit(): void {
    this.inicializarVariables();
  }

  ngOnDestroy(): void {
    this.ondestroy$.next(true);
  }

  private inicializarVariables() {
    this.procesarCargarFrases();
  }

  typeNextCharacter(): void {
    if (this.charIndex < this.frases[this.currentPhraseIndex].frase.length) {
      this.displayText += this.frases[this.currentPhraseIndex].frase[this.charIndex];
      this.author = this.frases[this.currentPhraseIndex].autor;
      this.colorAuthor = this.frases[this.currentPhraseIndex].colorText;
      this.charIndex++;
      setTimeout(() => this.typeNextCharacter(), 100);
    } else {
      setTimeout(() => this.deletePhrase(), 2000);
    }
  }

  deletePhrase(): void {
    if (this.charIndex > 0) {
      this.displayText = this.displayText.slice(0, -1);
      this.charIndex--;
      setTimeout(() => this.deletePhrase(), 50);
    } else {
      this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.frases.length;
      setTimeout(() => this.typeNextCharacter(), 500);
    }
  }

/*   private cargarFrases(){
    this.webService.consultarFrases()
    .pipe(takeUntil(this.ondestroy$))
    .subscribe({
      next:(resp) => {
        this.procesarCargaFrases(resp);
      }
    })
  } */

  async procesarCargarFrases(){
    // this.frases = resp;
    for(let i=0; i < PHRASES.length; i++){
      let frase = {
        frase: await this.traducirReferencia(PHRASES[i].frase),
        autor: await this.traducirReferencia(PHRASES[i].autor),
        borde: PHRASES[i].borde,
        colorText: PHRASES[i].colorText,
        id: PHRASES[i].id
      }
      this.frases.push(frase);
    }
    this.frases.sort((a,b) => { return Math.random() - 0.5});

    if(this.frases[1].frase){
      this.typeNextCharacter();
      console.log(this.frases,'PHRASES');
    }

  }

  public async traducirReferencia(ref: string):Promise<string> {
		try{
			let traduccion = await firstValueFrom(this.translate.get(ref));
			return traduccion;
		}catch{
			return 'NO-TRASLATE'
		}
	}

}
