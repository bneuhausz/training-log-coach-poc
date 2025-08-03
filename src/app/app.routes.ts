import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home'),
  },
  {
    path: 'confirm-email',
    loadComponent: () => import('./confirm-email/confirm-email'),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
