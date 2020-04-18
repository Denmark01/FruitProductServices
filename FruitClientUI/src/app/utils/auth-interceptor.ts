import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
        private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authService.isLoggedIn()) {
            const authToken = this.authService.getAuthorizationToken();
            req = req.clone({
                setHeaders:
                    { Authorization: 'Bearer ' + authToken }
                }
            );
        }
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
               if (event instanceof HttpResponse) {
               }
             }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status === 0 && err.statusText === 'Unknown Error') {
                    this.router.navigate(['server']);
                  }
                  if (err.statusText === 'failed') {
                    this.router.navigate(['server']);
                  }
                  if (err.status === 401) {
                    this.router.navigate(['server']);
                  }
                  if (err.status === 403) {
                    this.router.navigate(['server']);
                    localStorage.removeItem('token');
                  }
                  if (err.status === 404) {
                    this.router.navigate(['error']);
                  }
                  // if (err.status === 500) {
                  //   this.router.navigate(['server']);
                  // }
                }
              }
            ));
    }
}
