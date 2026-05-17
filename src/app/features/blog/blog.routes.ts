import { Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  {
    path: ':categoria',
    loadComponent: () =>
      import('./components/category-base/category-base.component').then(
        m => m.CategoryBaseComponent
      )
  },
  {
    path: ':categoria/:slug',
    loadComponent: () =>
      import('./components/post-base/post-base.component').then(
        m => m.PostBaseComponent
      )
  }
];