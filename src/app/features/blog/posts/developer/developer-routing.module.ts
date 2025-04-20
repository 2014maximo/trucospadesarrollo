import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const devRoutes:Routes = [
    {
        path:'',
        loadComponent: ()=>
            import('./dev-category/dev-category.component').then(
                (m) => m.DevCategoryComponent
            )
    },
    {
        path:'dev-super-recursos', 
        loadComponent:() =>
            import('./dev-sites/dev-sites.component').then(
                (m) => m.DevSitesComponent
            )
    }
]
console.log('Developer routing module cargado');
@NgModule({
    imports: [RouterModule.forRoot(devRoutes, { preloadingStrategy: 'none' })],
    exports: [RouterModule],
})

export class DevRoutingModule { }