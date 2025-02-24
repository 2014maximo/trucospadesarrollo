import { Component, OnInit } from '@angular/core';
import { SliderModel } from '../../models/post.model';
import { Router } from '@angular/router';
import { CATEGORIA } from '@constants/categories.constant';
import { CategoriaPostModel, DatosPost, SubCategoriaModel } from '@models/categorias.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider-home',
  imports: [
    CommonModule
  ],
  templateUrl: './slider-home.component.html',
  styleUrl: './slider-home.component.css'
})
export class SliderHomeComponent {

  public sliders: any;
  public categoria: CategoriaPostModel[] = CATEGORIA as [];

  constructor(private ruta: Router) {
  }

  ngOnInit(): void {
    this.inicializarVariables();
  }

  inicializarVariables(){
    this.sliders = this.extraerUltimosPost();
    let grupo = this.extraerUltimosPost();

  }

  private extraerUltimosPost(): SliderModel[]{

    let slidersSeleccionados: any[] =[];
    let grupoSliders: SliderModel[] = [];
    let incremento:number = 0;

    CATEGORIA.forEach((e:CategoriaPostModel, i:number)=>{
      e.post.forEach((element:any) => {
        slidersSeleccionados.push(element)
      });
      e.subcategorias.forEach((s:SubCategoriaModel) => {
        s.post.forEach((p: DatosPost) => {
          slidersSeleccionados.push(p);
        });
      })
    }); // SE EXTRAEN LOS POST DEL ÁRBOL

    slidersSeleccionados = slidersSeleccionados.filter((element:any) => 
      element.mostrarEnPostHome
    );// SE RETIRAN LOS POST CATEGORIA

    slidersSeleccionados.sort( (a:DatosPost, b:DatosPost) =>  
      this.convertirFechaANumero(b.fechaActualizacion) - this.convertirFechaANumero(a.fechaActualizacion)
    );// SE ORDENAN POR FECHA ASCENDENTE


    for(let i=0; i < slidersSeleccionados.length; i++){
      if(slidersSeleccionados[i].imgSlider){
        grupoSliders.push(slidersSeleccionados[i].imgSlider)
      }
    }
    
    return grupoSliders
  }

  public convertirFechaANumero(fecha:string):number{
    let numero = +(new Date(fecha).getTime());
    return +numero;
  }

  irAlPath(path: string){
    this.ruta.navigate(['/',path]);
    console.log(path,'ir')
  }

}

