import { Routes } from '@angular/router';

export const AI_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./ai-category/ai-category.component')
      .then(m => m.AiCategoryComponent)
  }
];