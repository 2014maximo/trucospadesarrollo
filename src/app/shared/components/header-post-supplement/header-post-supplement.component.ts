import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-header-post-supplement',
  imports: [DatePipe, CommonModule],
  templateUrl: './header-post-supplement.component.html',
  styleUrl: './header-post-supplement.component.css'
})
export class HeaderPostSupplementComponent {

  /** Ruta al PNG de la categoría: assets/img/categorias/nombreCategoria.png */
  @Input() rutaIcono: string = '';

  /** Título del post (ya traducido o en texto directo) */
  @Input() titulo: string = '';

  /** Párrafos del extracto/descripción del post */
  @Input() descripcion: string[] = [];

  /** Fecha de actualización si existe, si no la de creación */
  @Input() fecha: string = '';

}