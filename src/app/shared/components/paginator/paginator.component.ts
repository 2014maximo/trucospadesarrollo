import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, OnDestroy, Output, EventEmitter, SimpleChanges, Inject, PLATFORM_ID, HostListener, afterNextRender, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Pagina<T = any> {
  pagina: number;
  contenido: T[];
}

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public contenedor: any[] = [];
  @Input() public mostrarItemsPorPantalla: boolean = false;
  @Input() public itemIniciales: number = 0;
  @Input() public itemsPorPantalla: string[] = ['10', '50', '100', '200'];
  @Input() public itemsMobile: number = 0;
  @Output() paginados: EventEmitter<any[]> = new EventEmitter<any[]>();

  public totalPaginas = signal<Pagina[]>([]);
  public active = signal<string>('0');

  private inicializado = false;
  private mediaQuery?: MediaQueryList;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    afterNextRender(() => {
      const paginaActual = parseInt(this.active(), 10) || 0;
      this.recalcular(paginaActual);
    });
  }

  ngOnInit(): void {
    this.inicializado = true;
    if (isPlatformBrowser(this.platformId) && this.itemsMobile > 0) {
      this.mediaQuery = window.matchMedia('(max-width: 768px)');
      this.mediaQuery.addEventListener('change', this.onViewportChange);
    }
    this.recalcularYMostrar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.inicializado) {
      return;
    }
    if (changes['contenedor'] || changes['itemIniciales'] || changes['itemsMobile']) {
      const paginaActual = parseInt(this.active(), 10) || 0;
      this.recalcular(paginaActual);
    }
  }

  ngOnDestroy(): void {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', this.onViewportChange);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.inicializado) return;
    const paginaActual = parseInt(this.active(), 10) || 0;
    this.recalcular(paginaActual);
  }

  private onViewportChange = (): void => {
    const paginaActual = parseInt(this.active(), 10) || 0;
    this.recalcular(paginaActual);
  };

  public cargarCantidadElementos(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.calcularPaginas(+target.value);
    this.active.set('0');
    this.emitir(0);
  }

  public cargarPagina(pagina: number): void {
    this.active.set(pagina.toString());
    this.emitir(pagina);
  }

  private obtenerElementosPorPagina(): number {
    if (this.itemsMobile > 0 && isPlatformBrowser(this.platformId)) {
      const esMobile = window.matchMedia('(max-width: 768px)').matches;
      if (esMobile) {
        return this.itemsMobile;
      }
    }
    return this.itemIniciales > 0 ? this.itemIniciales : 9;
  }

  private recalcularYMostrar(): void {
    if (!this.contenedor || this.contenedor.length === 0) {
      return;
    }
    this.calcularPaginas(this.obtenerElementosPorPagina());
    this.active.set('0');
    this.emitir(0);
  }

  private recalcular(paginaObjetivo: number): void {
    if (!this.contenedor || this.contenedor.length === 0) {
      return;
    }
    this.calcularPaginas(this.obtenerElementosPorPagina());
    const total = this.totalPaginas().length;
    const paginaSegura = paginaObjetivo < total ? paginaObjetivo : 0;
    this.active.set(paginaSegura.toString());
    this.emitir(paginaSegura);
  }

  private emitir(pagina: number): void {
    const paginas = this.totalPaginas();
    Promise.resolve().then(() => {
      this.paginados.emit(paginas[pagina]?.contenido ?? []);
    });
  }

  private calcularPaginas(cantElementos: number): void {
    const paginas: Pagina[] = [];
    const datos = this.contenedor;
    for (let i = 0; i < datos.length; i += cantElementos) {
      paginas.push({
        pagina: Math.floor(i / cantElementos),
        contenido: datos.slice(i, i + cantElementos)
      });
    }
    this.totalPaginas.set(paginas);
  }

}