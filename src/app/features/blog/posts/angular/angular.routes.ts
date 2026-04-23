import { Routes } from '@angular/router';

export const ANGULAR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./angular-category/angular-category.component')
      .then(m => m.AngularCategoryComponent)
  },
  {
    path: 'instalacion',
    loadComponent: () => import('./ng-instalation/ng-instalation.component')
      .then(m => m.NgInstalationComponent)
  },
  {
    path: ':slug',
    loadComponent: () => import('../../components/post-base/post-base.component')
      .then(m => m.PostBaseComponent)
  }
];