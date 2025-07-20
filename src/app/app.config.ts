import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes'; // Importa tus rutas principales
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Importa HttpClientModule y provideHttpClient
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'; // Importa lo necesario de @ngx-translate
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; // Importa el loader

// Función Factory para TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json'); // Ajusta la ruta a tus archivos de traducción
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // provideHttpClient(), // Opción 1: Si no necesitas interceptores de HttpClientModule
    importProvidersFrom(HttpClientModule), // Opción 2: Si necesitas interceptores definidos en HttpClientModule o compatibilidad
    provideHttpClient(withInterceptorsFromDi()), // Asegura que los interceptores basados en DI funcionen si usas HttpClientModule
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'es' // Define tu idioma por defecto
      })
    )
    // Aquí puedes agregar otros providers que necesites
  ]
};
