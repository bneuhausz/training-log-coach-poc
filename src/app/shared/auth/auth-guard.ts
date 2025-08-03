import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';
import { map } from 'rxjs';

export const authGuard = (): CanActivateFn => {
  return () => {
    const auth = inject(Auth);
    const router = inject(Router);

    return auth.initialLoad$.pipe(
      map(_ => {
        if (auth.isAuthenticated()) {
          return true;
        }
        return router.parseUrl('/');
      })
    );
  };
};
