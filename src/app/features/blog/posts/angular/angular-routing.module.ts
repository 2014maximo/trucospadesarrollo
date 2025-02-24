import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const angularRoutes:Routes = [
    {
        path:'',
        loadComponent: ()=>
            import('./angular-category/angular-category.component').then(
                (m) => m.AngularCategoryComponent
            )
    },
    {
        path:'ng-instalation', 
        loadComponent:() =>
            import('./ng-instalation/ng-instalation.component').then(
                (m) => m.NgInstalationComponent
            )
    }
]
console.log('Angular routing module cargado');
@NgModule({
    imports: [RouterModule.forRoot(angularRoutes, { preloadingStrategy: 'none' })],
    exports: [RouterModule],
})

export class AngularRoutingModule { }