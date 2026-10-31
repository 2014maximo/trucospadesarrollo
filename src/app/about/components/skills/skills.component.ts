import { afterNextRender, Component, signal, DestroyRef, ElementRef, NgZone, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { animate, AnimationPlaybackControls, hover } from 'motion';
import { ITechnology, ITechnologyGroup } from '../../models/technology.model';
import { TECHNOLOGIES, TECHNOLOGY_GROUPS } from '../../constants/technology.constant';
import { StaggerDirective } from '../../../shared/directives/stagger.directive';
import { prefiereMovimientoReducido } from '../../../shared/directives/motion-utils';
import { SplitTextComponent } from '../../../shared/components/split-text/split-text.component';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule, TranslateModule, StaggerDirective, SplitTextComponent],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.css'
})
export class SkillsComponent {
    groups: (ITechnologyGroup & { technologies: ITechnology[] })[] = TECHNOLOGY_GROUPS
        .map(group => ({ ...group, technologies: TECHNOLOGIES.filter(tech => tech.category === group.category) }))
        .filter(group => group.technologies.length > 0);

    /** Dos filas de la cinta: todas las tecnologías y, en la segunda, en orden inverso. */
    filas: ITechnology[][] = [TECHNOLOGIES, [...TECHNOLOGIES].reverse()];
    readonly estatico = signal(false);

    @ViewChildren('fila') filasRef!: QueryList<ElementRef<HTMLElement>>;
    @ViewChildren('pista') pistasRef!: QueryList<ElementRef<HTMLElement>>;

    constructor(public translate: TranslateService, ngZone: NgZone, destroyRef: DestroyRef) {
        this.translate.addLangs(['fr', 'en', 'es']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');

        const limpiezas: VoidFunction[] = [];
        afterNextRender(() => {
            if (prefiereMovimientoReducido()) {
                this.estatico.set(true);
                return;
            }

            ngZone.runOutsideAngular(() => {
                const filas = this.filasRef.toArray();
                this.pistasRef.forEach((pista, i) => {
                    // La pista contiene dos copias: al desplazar un 50 % el bucle no tiene saltos
                    const animacion: AnimationPlaybackControls = animate(
                        pista.nativeElement,
                        { x: i % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] },
                        { duration: 60, ease: 'linear', repeat: Infinity }
                    );
                    const quitarHover = hover(filas[i].nativeElement, () => {
                        animacion.speed = 0.2;
                        return () => animacion.speed = 1;
                    });
                    limpiezas.push(() => animacion.stop(), quitarHover);
                });
            });
        });

        destroyRef.onDestroy(() => limpiezas.forEach(limpiar => limpiar()));
    }
}
