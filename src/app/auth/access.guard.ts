import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const canActivateAuth = () => {
  const isLoggedIn = inject(AuthService).isAuth();
  const router = inject(Router);

  if (isLoggedIn) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
