import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { angularRoutes } from "./features/blog/posts/angular/angular-routing.module";
import { devRoutes } from "./features/blog/posts/developer/developer-routing.module";

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => 
			import('./home/home.component').then((m) => m.HomeComponent), // Punto inicial por defecto
	},
	{
		path: 'angular',
		children: angularRoutes // Hacia otro routing y cargar más componentes
	},
	{
		path: 'dev',
		children: devRoutes // Hacia otro routing y cargar más componentes
	},
	{
		path: 'about',
		loadComponent: () =>
			import('./about/about.component').then((m) => m.AboutComponent),
	},
	{
		path: 'contact',
		loadComponent: () =>
			import('./contact/contact.component').then((m) => m.ContactComponent), // Carga diferida de "Contacto"
	},
	{
		path: '**',
		redirectTo: '', // Manejo de rutas no encontradas
	},
	
]
@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: 'none' })],
	exports: [RouterModule],
})
export class AppRoutingModule { }