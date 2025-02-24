import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {
  @Input() public contenedor: any[] = [];
  @Input() public mostrarItemsPorPantalla: boolean = false;
  @Input() public itemIniciales: number = 0;
  @Input() public itemsPorPantalla: string[] = ['10','50','100','200'];
  @Output() paginados: EventEmitter<any> =  new EventEmitter();
  
  public totalPaginas: any[] = [];
  public contenedorCache: any[] = [];
  public active: string = '1';

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      if(this.contenedor){
        this.contenedorCache = this.contenedor;
        this.calcularPaginas(this.itemIniciales);
        this.paginados.emit(this.totalPaginas[0].contenido)
      }
    }, 700);
    this.cargarPagina(0);
  }

  public cargarCantidadElementos(e: any, pagina: number){
    this.calcularPaginas(+e.target.value);
    this.paginados.emit(this.totalPaginas[pagina].contenido);
  }

  private calcularPaginas(cantElementos: number){
    this.totalPaginas = [];
    let contador = 0;
    // let cantPaginas = Math.ceil(this.contenedor.length / cantElementos);
    if(this.contenedorCache){
      this.contenedor = this.contenedorCache;
    }
    for(let i = 0; i < this.contenedor.length; i += cantElementos){
      this.contenedorCache = this.contenedor;
      this.totalPaginas[contador] = {
        pagina: contador,
        contenido: this.contenedorCache.slice((contador * cantElementos), (contador + 1) * cantElementos)
      }
      contador++;
    }
  }

  public cargarPagina(pagina: number){
    this.active = pagina.toString();
    if(this.totalPaginas[pagina]?.contenido){
      this.paginados.emit(this.totalPaginas[pagina]?.contenido);
    }
  }
  
}

