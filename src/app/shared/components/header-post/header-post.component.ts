import { Component, EventEmitter, Input, Output, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CATEGORIA } from '@constants/categories.constant';
import { CategoriaPostModel } from '@models/categorias.model';
import { IndiceDeContenidosModel } from '@models/indice.model';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, takeUntil } from 'rxjs';
import { CategoriaModel } from '../../models/post.model';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TraduccionService } from '../../services/traduccion.service';
import { ContentIndexComponent } from '../content-index/content-index.component';
import { CommonModule } from '@angular/common';
import { BlogContentService } from 'src/app/features/blog/services/blog-content.service';
import { PostViewModel } from 'src/app/features/blog/models/post-view.model';

interface SearchResultItem {
  titulo: string;
  ruta: string;
}

@Component({
  selector: 'app-header-post',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ContentIndexComponent
  ],
  templateUrl: './header-post.component.html',
  styleUrl: './header-post.component.css'
})
export class HeaderPostComponent {

  public formBasic: FormGroup;
  public categorias = CATEGORIA;
  public mostrarResultados: boolean = false;
  public encontrados: SearchResultItem[] = [];
  public buscando: boolean = false;
  public lang: string = 'es';
  public lenguajes: string[] = ['es', 'en', 'fr'];
  public idiomaActual: string = '';
  public ondestroy$: Subject<boolean> = new Subject();
  public categoriasMenu = false;
  public pasoDeIndice: IndiceDeContenidosModel[] = [];
  public claseContenedor: string = '';
  public showSearch: boolean = false;
  public showMenu: boolean = true;
  public showLanguajes: boolean = false;
  public showCategories: boolean = false;
  @Output() recargarTraduccion: EventEmitter<any> = new EventEmitter();

  @Input() categoria: CategoriaModel = {
    activo: false,
    categoria: '',
    ruta: '',
    colorText: ''
  };

  private searchTerm$ = new Subject<string>();

  constructor(private router: Router,
    public translate: TranslateService,
    private traduccion: TraduccionService,
    private blogContent: BlogContentService,
    @Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem("idioma")) {
        this.idiomaActual = localStorage.getItem('idioma') ?? '';
      } else {
        this.idiomaActual = navigator.language.split('-')[0];
      }
      translate.setDefaultLang(navigator.language.split('-')[0]);
    } else {
      this.idiomaActual = 'es';
      translate.setDefaultLang('es');
    }

    translate.use(this.idiomaActual);
    this.cargarListaLenguajes(this.idiomaActual);

    this.inicializarVariables();
    this.formBasic = new FormGroup({
      'busqueda': new FormControl('')
    });

    this.translate.addLangs(['fr', 'en', 'es']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.configurarBusqueda();
  }

  private inicializarVariables() {
    CATEGORIA.forEach((cat: CategoriaPostModel) => {
      let grupo: IndiceDeContenidosModel = {
        color: '',
        colorFondo: cat.colorFondo,
        estado: cat.estado,
        nombre: cat.nombre.toUpperCase(),
        posicion: cat.posicion,
        ruta: cat.ruta,
        rutaInterna: ''
      }
      this.pasoDeIndice.push(grupo);
    });
  }

  private configurarBusqueda(): void {
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term.trim()) return of([]);
        return this.blogContent.searchPosts(term, 8);
      }),
      takeUntil(this.ondestroy$)
    ).subscribe({
      next: (posts: PostViewModel[]) => {
        this.buscando = false;
        this.encontrados = posts.map(p => this.toSearchResult(p));
      },
      error: () => {
        this.buscando = false;
        this.encontrados = [];
      }
    });
  }

  private toSearchResult(post: PostViewModel): SearchResultItem {
    const categoriaLower = (post.categoriaNombre || '').toLowerCase();
    return {
      titulo: post.titulo,
      ruta: `/blog/${categoriaLower}/${post.slug}`
    };
  }

  public buscar(): void {
    const termino = (this.formBasic.value.busqueda ?? '').trim();
    if (termino.length === 0) {
      this.mostrarResultados = false;
      this.encontrados = [];
      return;
    }
    this.mostrarResultados = true;
    this.buscando = true;
    this.searchTerm$.next(termino);
  }

  openSearch() {
    this.showSearch = !this.showSearch;
    this.showMenu = !this.showMenu;
  }
  closeOptions() {
    this.showMenu = true;
    this.showSearch = false;
    this.showLanguajes = false;
    this.showCategories = false
  }
  openLanguage() {
    this.showLanguajes = !this.showLanguajes;
    this.showMenu = !this.showMenu;
  }
  openCategories() {
    this.showCategories = !this.showCategories;
    this.showMenu = !this.showMenu;
  }

  public desaparecerTablaBusqueda() {
    setTimeout(() => {
      this.mostrarResultados = false;
      this.buscando = false;
      this.formBasic.get('busqueda')?.setValue('');
    }, 2000)
  }

  public irAlPost(post: string) {
    this.router.navigateByUrl(post);
  }

  public procesoCambioLenguaje(a: string) {
    localStorage.setItem("idioma", a);
    this.idiomaActual = a;
    this.traduccion.cambiarIdioma(a);
    this.cargarListaLenguajes(a);
  }

  cargarListaLenguajes(a: string) {
    this.lenguajes = ['es', 'en', 'fr'];

    let indice = this.lenguajes.indexOf(a);
    if (indice !== -1) {
      this.lenguajes = this.lenguajes.slice(0, indice).concat(this.lenguajes.slice(indice + 1));
    }
  }

}
