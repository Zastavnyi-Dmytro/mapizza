import { CanActivateFn } from '@angular/router';
import { ROLE } from '../../constans/role.constant';

export const authGuard: CanActivateFn = (route, state) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  if(currentUser&& (currentUser.role === ROLE.ADMIN || currentUser.role === ROLE.USER)){
    return true
  }
    return false;
};
