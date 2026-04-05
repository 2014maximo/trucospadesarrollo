import { Component, Input } from '@angular/core';
import { BlockTextModel } from '../../models/block-text.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ImageAdapterComponent } from '../image-adapter/image-adapter.component';

@Component({
  selector: 'app-block-text',
  imports: [
    CommonModule,
    ImageAdapterComponent,
    TranslateModule
  ],
  templateUrl: './block-text.component.html',
  styleUrl: './block-text.component.css'
})
export class BlockTextComponent {
  
  @Input() block: BlockTextModel = 
  {
    title: {
      textI18n: 'El problema de las habilidades de copia',
      style: 'f-yanone fs-30 text-light'
    },
    groupblock: [
      {
        paragraph: [
      {
        style:'c7 f-open-sans-c fs-20 lh-20',
        textI18n:'Un complemento de Claude Code reside en un directorio y puede exponer habilidades: pequeños archivos Markdown que describen un comando o capacidad que Claude puede usar. Cuando se tiene más de un complemento, resulta tentador estructurar las cosas de esta manera:'

      } 
    ]
      }
      
    ]
    
  }

  constructor(private translate: TranslateService){}


  traducirTexto(texto: string): string {
    if (!texto) {
      return texto;
    }

    const traduccion = this.translate.instant(texto);
    return traduccion !== texto ? traduccion : texto;
  }
}
