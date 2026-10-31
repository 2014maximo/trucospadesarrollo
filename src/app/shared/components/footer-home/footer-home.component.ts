import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, Inject, NgZone, PLATFORM_ID, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { animate, AnimationPlaybackControls, inView } from 'motion';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { WordRotatorComponent } from '../word-rotator/word-rotator.component';
import { StaggerDirective } from '../../directives/stagger.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { SpotlightDirective } from '../../directives/spotlight.directive';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { prefiereMovimientoReducido } from '../../directives/motion-utils';

const IDIOMAS = ['es', 'en', 'fr'];

@Component({
  selector: 'app-footer-home',
  imports: [
    CommonModule, TranslateModule, ContactFormComponent, WordRotatorComponent,
    StaggerDirective, RevealDirective, SpotlightDirective, ScrollAnimateDirective
  ],
  templateUrl: './footer-home.component.html',
  styleUrl: './footer-home.component.css'
})
export class FooterHomeComponent implements AfterViewInit {

  readonly anio = new Date().getFullYear();

  @ViewChild('firma') firma!: ElementRef<HTMLImageElement>;

  private detenerObservador?: VoidFunction;
  private animacion?: AnimationPlaybackControls;

  constructor(
    public translate: TranslateService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object,
    destroyRef: DestroyRef
  ) {
    // `navigator` no existe en el servidor (SSR): solo se consulta en navegador y se limita a idiomas con traducción
    const idiomaNavegador = isPlatformBrowser(platformId) ? navigator.language.split('-')[0] : 'es';
    translate.setDefaultLang(IDIOMAS.includes(idiomaNavegador) ? idiomaNavegador : 'es');

    destroyRef.onDestroy(() => {
      this.detenerObservador?.();
      this.animacion?.stop();
    });
  }

  /** La firma se "escribe" de izquierda a derecha al entrar en pantalla. */
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || prefiereMovimientoReducido()) {
      return;
    }

    const firma = this.firma.nativeElement;
    firma.style.clipPath = 'inset(0 100% 0 0)';
    this.ngZone.runOutsideAngular(() => {
      // Se observa el enlace y no la imagen: IntersectionObserver tiene en cuenta el clip-path y nunca la vería
      this.detenerObservador = inView(firma.parentElement ?? firma, () => {
        this.animacion = animate(firma, { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] }, { duration: 1.6, ease: [0.65, 0, 0.35, 1] });
      }, { amount: 0.6 });
    });
  }

}
