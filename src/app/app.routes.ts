import { Routes } from '@angular/router';
import { authGuard } from './shared/auth/auth-guard';

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
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard'),
    canActivate: [authGuard()],
  },
  {
    path: '**',
    redirectTo: '',
  }
];
