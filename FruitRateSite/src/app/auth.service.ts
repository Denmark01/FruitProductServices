import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { config, alertMsg, alertType } from './utils/config';
import {environment } from '../environments/environment';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { LoginState } from './containers/login/login.reducer';
import { SAVE_PROFILE, LOGIN_LOADER, LOGIN, LOADER_OFF } from './containers/login/login.action';
import { AppReduxService } from './services/app-redux.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  saveToken: any;
  isLogged = false;
  errorData: {};
  userId: string;

  constructor(private http: HttpClient,
    private router: Router,
    private ngRedux: NgRedux<LoginState>,
    private reduxService: AppReduxService) { }

  redirectUrl: string;

  // login(username: string, password: string) {
  //   return this.http.post<any>(this.serverUrl, {username: username, password: password})
  //   .pipe(map(user => {
  //       if (user && user.jwt) {
  //         // localStorage.setItem('user', JSON.stringify(user));
  //         localStorage.setItem('token', user.jwt);
  //       } else {
  //         console.log(JSON.stringify(user));
  //       }
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  login(user, pass) {
    const requestUrl = environment.apiUrl + config.api.auth;
    const data = {username: user, password: pass};
    this.ngRedux.dispatch({type: LOGIN_LOADER});
    this.http.post(requestUrl, data).subscribe(user => {
      if (user) {
        this.saveToken = user;
        localStorage.setItem('token', this.saveToken.jwt);
        // localStorage.setItem('userId', this.saveToken.user);
        // localStorage.setItem('userUid', this.saveToken.userId);
        this.ngRedux.dispatch({type: LOGIN, username: this.saveToken.user, user_id : this.saveToken.userId});
        this.router.navigate(['']);
      }
    }, err => {
      if (err.status === 401) {
        this.reduxService.notification(alertMsg.invalidPassUser, alertType.danger);
      } else {
        this.reduxService.notification(alertMsg.internalError, alertType.danger);
      }
      this.ngRedux.dispatch({type: LOADER_OFF});
    });
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  logout() {
    localStorage.removeItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
