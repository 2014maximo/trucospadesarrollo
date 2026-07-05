import { Component, input, computed, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { resolverIconoCategoria } from '../categories/categories.helper';

@Component({
  selector: 'app-header-post-supplement',
  imports: [DatePipe, CommonModule],
  templateUrl: './header-post-supplement.component.html',
  styleUrl: './header-post-supplement.component.css'
})
export class HeaderPostSupplementComponent {

  private readonly themeService = inject(ThemeService);

  /** Nombre de la categoría (p. ej. 'Developer'). Se resuelve a su ícono desde CATEGORIES. */
  readonly categoria = input<string>('');

  /** Título del post (ya traducido o en texto directo) */
  readonly titulo = input<string>('');

  /** Párrafos del extracto/descripción del post */
  readonly descripcion = input<string[]>([]);

  /** Fecha de actualización si existe, si no la de creación */
  readonly fecha = input<string>('');

  /** Ruta al PNG de la categoría según el tema activo (dark => iconLight, light => iconDark). */
  readonly rutaIcono = computed(() =>
    resolverIconoCategoria(this.categoria(), this.themeService.theme())
  );

}