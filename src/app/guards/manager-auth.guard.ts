import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const managerAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let role = localStorage.getItem('role');
  if(role =="Manager")
    return true;
  else {
    router.navigate(['/login']);
    return false;
  }
};
