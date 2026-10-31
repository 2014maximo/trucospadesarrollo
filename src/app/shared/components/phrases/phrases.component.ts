import { ChangeDetectorRef, Component, DestroyRef, ElementRef, Inject, NgZone, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { animate, inView, stagger } from 'motion';
import { IFrasesModel } from '../../models/phrases.model';
import { PHRASES } from './constants/phrases.constant';
import { limpiarEstilosEnLinea, prefiereMovimientoReducido } from '../../directives/motion-utils';

export type PhrasesEstado = 'cargando' | 'listo' | 'error';

/** Al terminar una animación de tinta devuelve el elemento al CSS (sin opacidad, desenfoque ni recorte en línea). */
function limpiarEstilosDeTinta(elemento: HTMLElement): void {
  limpiarEstilosEnLinea(elemento);
  elemento.style.removeProperty('filter');
  elemento.style.removeProperty('clip-path');
}

/** Segundos que se muestra cada frase: base fija + tiempo de lectura por palabra. */
const SEGUNDOS_BASE = 5;
const SEGUNDOS_POR_PALABRA = 0.35;

@Component({
  selector: 'app-phrases',
  imports: [TranslateModule],
  templateUrl: './phrases.component.html',
  styleUrl: './phrases.component.css'
})
export class PhrasesComponent implements OnInit {

  estado: PhrasesEstado = 'cargando';
  frases: IFrasesModel[] = [];
  indice = 0;
  /** Pausa elegida por la persona (con movimiento reducido se empieza en pausa). */
  pausado = false;

  @ViewChild('pergamino') pergamino?: ElementRef<HTMLElement>;

  private readonly esNavegador: boolean;
  private visible = false;
  private temporizador?: ReturnType<typeof setTimeout>;
  private detenerObservador?: VoidFunction;

  constructor(
    private translate: TranslateService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: object,
    private destroyRef: DestroyRef
  ) {
    this.esNavegador = isPlatformBrowser(platformId);
    destroyRef.onDestroy(() => {
      clearTimeout(this.temporizador);
      this.detenerObservador?.();
    });
  }

  ngOnInit(): void {
    this.pausado = this.esNavegador && prefiereMovimientoReducido();
    this.procesarCargarFrases(true);
    // Al cambiar de idioma se vuelven a traducir sin perder la posición
    this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.procesarCargarFrases(false));
  }

  get fraseActual(): IFrasesModel {
    return this.frases[this.indice];
  }

  get palabras(): string[] {
    return this.fraseActual?.frase.split(' ').filter(Boolean) ?? [];
  }

  dosCifras(numero: number): string {
    return numero.toString().padStart(2, '0');
  }

  async procesarCargarFrases(barajar: boolean): Promise<void> {
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

      if (barajar) {
        this.frases = traducciones.sort(() => Math.random() - 0.5);
      } else {
        // Mantiene el orden ya barajado
        this.frases = this.frases.map(f => traducciones.find(t => t.id === f.id) ?? f);
      }

      const primeraCarga = this.estado !== 'listo';
      this.estado = 'listo';
      if (primeraCarga && this.esNavegador) {
        this.cdr.detectChanges();
        this.observarVisibilidad();
      }
    } catch {
      this.estado = 'error';
    }
  }

  siguiente(): void {
    this.mostrar(this.indice + 1);
  }

  anterior(): void {
    this.mostrar(this.indice - 1);
  }

  alternarPausa(): void {
    this.pausado = !this.pausado;
    this.programarSiguiente();
  }

  /** Cambia a la frase `destino` (circular): la actual se desvanece y la nueva aparece como tinta. */
  async mostrar(destino: number): Promise<void> {
    if (this.frases.length === 0) {
      return;
    }
    clearTimeout(this.temporizador);
    const animar = this.esNavegador && !prefiereMovimientoReducido() && !!this.pergamino;

    if (animar) {
      const actuales = this.pergamino!.nativeElement.querySelectorAll('.tinta, .autor');
      await animate(actuales, { opacity: 0, filter: 'blur(4px)' }, { duration: 0.35 }).finished;
    }

    this.indice = (destino + this.frases.length) % this.frases.length;
    this.cdr.detectChanges();

    if (animar) {
      this.revelar();
    }
    this.programarSiguiente();
  }

  /** La frase aparece palabra a palabra como tinta que se extiende; el autor se escribe de izquierda a derecha. */
  private revelar(): void {
    const pergamino = this.pergamino!.nativeElement;
    const palabras = pergamino.querySelectorAll<HTMLElement>('.tinta');
    const autor = pergamino.querySelector<HTMLElement>('.autor')!;
    const retrasoAutor = palabras.length * 0.06 + 0.3;

    this.ngZone.runOutsideAngular(() => {
      animate(palabras,
        { opacity: [0, 1], filter: ['blur(6px)', 'blur(0px)'], y: [6, 0] },
        { duration: 0.6, delay: stagger(0.06) })
        .finished.then(() => palabras.forEach(limpiarEstilosDeTinta));
      // El autor también recupera opacidad y nitidez: la salida de la frase anterior lo dejó difuminado
      animate(autor,
        { opacity: [0, 1], filter: ['blur(0px)', 'blur(0px)'], clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] },
        { duration: 1.1, delay: retrasoAutor, ease: [0.65, 0, 0.35, 1] })
        .finished.then(() => limpiarEstilosDeTinta(autor));
    });
  }

  /** Avanza solo si no está en pausa y la sección se ve: no gasta frases fuera de pantalla. */
  private programarSiguiente(): void {
    clearTimeout(this.temporizador);
    if (!this.esNavegador || this.pausado || !this.visible || this.frases.length < 2) {
      return;
    }
    const segundos = SEGUNDOS_BASE + this.palabras.length * SEGUNDOS_POR_PALABRA;
    this.temporizador = setTimeout(() => this.siguiente(), segundos * 1000);
  }

  private observarVisibilidad(): void {
    const pergamino = this.pergamino?.nativeElement;
    if (!pergamino) {
      return;
    }
    let primeraVez = !prefiereMovimientoReducido();
    if (primeraVez) {
      // Oculta la primera frase hasta que se vea, para que aparezca como tinta sin parpadeo
      pergamino.querySelectorAll<HTMLElement>('.tinta, .autor').forEach(e => e.style.opacity = '0');
    }
    this.ngZone.runOutsideAngular(() => {
      this.detenerObservador = inView(pergamino, () => {
        this.ngZone.run(() => {
          this.visible = true;
          if (primeraVez) {
            this.revelar();
          }
          primeraVez = false;
          this.programarSiguiente();
        });
        return () => this.ngZone.run(() => {
          this.visible = false;
          clearTimeout(this.temporizador);
        });
      }, { amount: 0.4 });
    });
  }

}
