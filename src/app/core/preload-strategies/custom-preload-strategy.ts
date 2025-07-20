import { Injectable } from '@angular/core';
import { PreloadAllModules, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomPreloadStrategy implements PreloadAllModules {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        // Si la ruta tiene data.preload establecida en true, precargamos
        if (route.data && route.data['preload']) {
            return load();
        }
        // Si no, no precargamos el módulo
        return of(null);
    }
}