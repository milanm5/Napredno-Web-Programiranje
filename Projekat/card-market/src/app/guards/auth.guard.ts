import { CanActivateFn, Router } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const userStore = inject(UserStoreService);
  const router = inject(Router);

  if (userStore.isLoggedIn()) {
    return true;
  }
  console.log('AuthGuard#canActivate not authorized to access page');
  router.navigate(["/login"]);
  return false;
};
