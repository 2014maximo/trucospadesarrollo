import { Routes } from '@angular/router';

export const DEVELOPER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dev-category/dev-category.component')
      .then(m => m.DevCategoryComponent)
  },
  {
    path: 'ias',
    loadComponent: () => import('./dev-ias/dev-ias.component')
      .then(m => m.DevIasComponent)
  },
  {
    path: 'sites',
    loadComponent: () => import('./dev-sites/dev-sites.component')
      .then(m => m.DevSitesComponent)
  }
];