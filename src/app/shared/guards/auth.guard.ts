import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loggedInRoutes = ['/dashboard', '/galery', '/crud', '/profile', '/rotate'];
  const loggedOutRoutes = ['/home', '/login', '/about'];

  if (authService.isLogged() && loggedOutRoutes.includes(state.url)) {
    router.navigate(['/dashboard']);
    return false;
  } else if (!authService.isLogged() && loggedInRoutes.includes(state.url)) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
