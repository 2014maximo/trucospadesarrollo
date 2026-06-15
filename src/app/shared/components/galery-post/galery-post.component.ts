import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { datosCategoria } from '@shared//global-functions';
import { BlogContentService } from 'src/app/features/blog/services/blog-content.service';
import { PostViewModel } from 'src/app/features/blog/models/post-view.model';
import { TraduccionService } from '../../services/traduccion.service';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';
import { TraslateForce } from '@shared//traslate-function';

interface GalleryPostItem {
  id: string;
  titulo: string;
  resumen: string;
  imagenUrl: string;
  ruta: string;
  categoriaNombre: string;
  categoriaRuta: string;
  categoriaIcono: string;
  fecha: string;
}

export type GalleryEstado = 'cargando' | 'listo' | 'error' | 'vacio' | 'sin-api';

@Component({
  selector: 'app-galery-post',
  imports: [TranslateModule, CommonModule, PaginatorComponent],
  templateUrl: './galery-post.component.html',
  styleUrl: './galery-post.component.css'
})
export class GaleryPostComponent implements OnInit {

  @Input() itemIniciales: number = 0;

  public estado: GalleryEstado = 'cargando';
  public grupoGaleria: any[] = [];
  public postPorPantalla: string[] = ['9', '18'];
  public todosLosPost: GalleryPostItem[] = [];
  public postPaginar: GalleryPostItem[] = [];
  public anchoPantalla = 1024;
  public ondestroy$: Subject<boolean> = new Subject();

  constructor(
    private translate: TranslateService,
    private traduccion: TraduccionService,
    private blogContent: BlogContentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.anchoPantalla = window.innerWidth;
    }
    const transla = new TraslateForce(this.translate);
    transla.listTranslates();
  }

  ngOnInit(): void {
    if (!this.blogContent.hasBaseUrl()) {
      this.estado = 'sin-api';
      return;
    }

    this.cargarPosts();

    this.traduccion.cambioIdioma$.pipe(
      takeUntil(this.ondestroy$)
    ).subscribe({
      next: () => {
        location.reload();
      }
    });
  }

  ngOnDestroy() {
    this.ondestroy$.next(true);
  }

  private cargarPosts(): void {
    this.estado = 'cargando';
    this.blogContent.getLatestPosts(100).subscribe({
      next: posts => {
        this.todosLosPost = posts.map(p => this.toGalleryItem(p));
        this.estado = this.todosLosPost.length > 0 ? 'listo' : 'vacio';
      },
      error: err => {
        console.error('[GaleryPost] Error al cargar posts:', err);
        this.estado = 'error';
      }
    });
  }

  private toGalleryItem(post: PostViewModel): GalleryPostItem {
    const categoriaLower = (post.categoriaNombre || '').toLowerCase();
    return {
      id: post.id,
      titulo: post.titulo,
      resumen: this.stripHtml(post.resumenHtml),
      imagenUrl: post.imagenDestacada ?? '',
      ruta: `/blog/${categoriaLower}/${post.slug}`,
      categoriaNombre: post.categoriaNombre,
      categoriaRuta: datosCategoria(categoriaLower, 11) || `/blog/${categoriaLower}`,
      categoriaIcono: datosCategoria(categoriaLower, 12) || '',
      fecha: ((post.fechaModificacion || post.fechaPublicacion) || '').substring(0, 10)
    };
  }

  private stripHtml(html: string): string {
    if (!html) return '';
    if (typeof document === 'undefined') {
      return html.replace(/<[^>]+>/g, '').trim();
    }
    const el = document.createElement('div');
    el.innerHTML = html;
    return (el.textContent ?? el.innerText ?? '').trim();
  }

  public tipoSombra(path: string): string {
    let sombra = 'marcoFoto shadow-two';
    if (path.includes('png')) {
      sombra = 'drop';
    }
    return sombra;
  }

  public recibirCantidadElementos(e: GalleryPostItem[]) {
    this.postPaginar = Object.assign([], e);
  }

  public retornarDatoCategoria(categoria: string, referencia: number): string {
    return datosCategoria(categoria, referencia);
  }

  public referenciaImagen(valor: string, contenido: string): string {
    return contenido ? contenido : valor;
  }

}
