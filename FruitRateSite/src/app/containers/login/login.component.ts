import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import { AuthService } from 'src/app/auth.service';
import { NgRedux } from 'ng2-redux';
import { LoginState } from './login.reducer';
import { AppReduxService } from 'src/app/services/app-redux.service';
import { alertType } from 'src/app/utils/config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public mode: boolean;
  public loginName: string;
  public logUser: string;
  public isSignInLoading: boolean;
  public isAdmin: boolean;
  public isGuest = false;
  public gend: string;

  constructor(private http: HttpClient,
    private route: Router,
    private service: DataShareService,
    private authService: AuthService,
    private reduxService: AppReduxService,
    private ngRedux: NgRedux<LoginState>) { }

  ngOnInit() {
    const url = this.route.url;
    if (url.includes('login')) {
      this.mode = true;
    } else if (url.includes('signup')) {
      this.mode = false;
    }

    this. ngRedux.subscribe(() => {
      const store: any = this.ngRedux.getState();
      this.isSignInLoading = store.login.login_loader;
      this.isAdmin = store.login.is_admin;
    });
  }

  submitLogin(email, password) {
    if (email && password) {
      this.authService.login(email, password);
    } else {
      this.reduxService.notification('Please provide username and password', alertType.danger);
    }
  }

  gender(gender) {
    this.gend = gender;
  }

  signUp(name, email, mobno, pass) {
    if (name && email && mobno && pass && this.gend) {
      if (mobno.length === 10) {
        this.reduxService.signUp({name: name, email: email, mob_no: mobno, pass: pass, gender: this.gend});
      } else {
        this.reduxService.notification('Please enter 10 digit mob no', alertType.danger);
      }
    }  else {
      this.reduxService.notification('Please fill all fields', alertType.danger);
    }
  }

  guestLogin(user) {
    if (user && user.trim() !== '') {
      this.authService.login(user, '');
    }  else {
      this.reduxService.notification('Enter your name to continue', alertType.danger);
      alert();
    }
  }

  signInGuest() {
    this.isGuest = true;
  }

  submitLogin1(pin) {
    // console.log('Email and password ' + email + ' ' + password);
    // const param = { 'email': email, 'password': password};
    // this.http.post('http://192.168.43.251:9096/getAll', param).subscribe( data => {
    //   console.log(data);
    // })
    let url = 'http://www.postalpincode.in/api/pincode/';
    let url1 = url.concat(pin);
    console.log('url '+ url1);
    this.http.get(url1).subscribe( pin => {
      console.log(JSON.stringify(pin));
    });
  }
}
