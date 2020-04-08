import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate1(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    console.log('Can Activate 1 ' + url);
    return this.checkLogin(url);
  }

  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate1(route, state);
  }

  checkLogin(url: string) {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.redirectUrl = url;

    this.router.navigate(['/login'], {queryParams: { returnUrl: url }} );
  }
}
