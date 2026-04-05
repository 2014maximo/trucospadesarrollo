import { Routes } from '@angular/router';

export const AI_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./ai-category/ai-category.component')
      .then(m => m.AiCategoryComponent)
  },
  {
    path: 'sdd',
    loadComponent: () => import('./ai-spec-driven-development/ai-spec-driven-development.component')
      .then(m => m.AiSpecDrivenDevelopmentComponent)
  },
];