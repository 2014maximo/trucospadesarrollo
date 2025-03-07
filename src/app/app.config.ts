import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideHttpClient} from "@angular/common/http";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";

import { routes } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, 'assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })]), provideFirebaseApp(() => initializeApp({ projectId: "blog-4e57a", appId: "1:520935042224:web:3cc6b6edf337477f4a1f75", databaseURL: "https://blog-4e57a-default-rtdb.firebaseio.com", storageBucket: "blog-4e57a.appspot.com", apiKey: "AIzaSyB4kw9EnRuygD-Jeku34jgrDJkmhmRzyY4", authDomain: "blog-4e57a.firebaseapp.com", messagingSenderId: "520935042224", measurementId: "G-QZ97PNTT9E" })), provideFirestore(() => getFirestore())
  ]
};
