import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CATEGORIA } from '@constants/categories.constant';
import { DatosPost } from '@models/categorias.model';
import { datosCategoria } from '@shared//global-functions';
import { TraduccionService } from '../../services/traduccion.service';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';
import { TraslateForce } from '@shared//traslate-function';

@Component({
  selector: 'app-galery-post',
  imports: [TranslateModule, CommonModule, PaginatorComponent],
  templateUrl: './galery-post.component.html',
  styleUrl: './galery-post.component.css'
})
export class GaleryPostComponent implements OnInit {

  @Input() itemIniciales: number = 0;

  public categorias = CATEGORIA
  public grupoGaleria: any[] = [];
  public postPorPantalla: string[] = ['9','18'];
  public todosLosPost: DatosPost[] = [];
  public postPaginar: DatosPost[] = [];
  public ultimosPost: any[] = [];
  public anchoPantalla = window.innerWidth;
  public ondestroy$: Subject<boolean> = new Subject();

  constructor(private translate: TranslateService, private traduccion: TraduccionService) {
    const transla = new TraslateForce(this.translate);
    transla.listTranslates();
  }

  ngOnInit(): void {
    this.agruparPost();
    this.traduccion.cambioIdioma$.pipe(
      takeUntil(this.ondestroy$)
    ).subscribe({
      next:(tr)=>{
        location.reload();
      }
    });
  }

  ngOnDestroy() {
    this.ondestroy$.next(true);
  }

  public cargarGrupoGaleria():any[] {
    let grupo: any[] = [];
    return grupo
  }

  private agruparPost(){
    this.todosLosPost = this.traduccion.todosLosPost;
    const uniqueItems = Array.from(
      new Map(this.todosLosPost.map(
        item => [item.id , item])
      ).values()
    );

    const activeItems = uniqueItems.filter((item:DatosPost) => item.estado === 'activo');

    setTimeout(()=>{
      this.todosLosPost = this.ordenarPostPorFecha(activeItems);
    },100);

  }

  private ordenarPostPorFecha(grupo: DatosPost[]):DatosPost[]{
    const compararFechas = (a:any, b:any) => {
      const AFecha = a.fechaActualizacion?a.fechaActualizacion:a.fechaCreacion;
      const BFecha = b.fechaActualizacion?b.fechaActualizacion:b.fechaCreacion;
      const fechaA = new Date(AFecha).getTime();
      const fechaB = new Date(BFecha).getTime();

      return fechaB - fechaA;
    }; 
    return grupo.sort(compararFechas);
  }


  public convertirFechaANumero(fecha:string):number{
    let numero = +(new Date(fecha).getTime());
    return +numero;
  }

  public tipoSombra(path: string):string{
    let sombra='marcoFoto shadow-two';

    if(path.includes('png')){
      sombra = 'drop'
    }
    return sombra
  }

  public recibirCantidadElementos(e:any){
    this.postPaginar = Object.assign([], e);
  }

  public retornarDatoCategoria(categoria: string, referencia: number): string{
    return datosCategoria(categoria,referencia);
  }

  public referenciaImagen(valor: string, contenido: string):string{
    let valorDefecto = valor;

    if(contenido){
      valorDefecto = contenido;
    }
    return valorDefecto;
  }


}