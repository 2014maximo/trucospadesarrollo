import { Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  {
    path: 'angular',
    loadChildren: () => import('./posts/angular/angular.routes').then(m => m.ANGULAR_ROUTES)
  },
  {
    path: 'developer',
    loadChildren: () => import('./posts/developer/developer.routes').then(m => m.DEVELOPER_ROUTES)
  }
];