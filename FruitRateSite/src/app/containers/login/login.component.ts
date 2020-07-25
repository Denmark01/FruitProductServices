import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import { AuthService } from 'src/app/auth.service';
import { NgRedux } from 'ng2-redux';
import { LoginState } from './login.reducer';
import { AppReduxService } from 'src/app/services/app-redux.service';
import { alertType, alertMsg } from 'src/app/utils/config';


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
  public isShopActive = false;
  public gend: string;
  public shopName = '';

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
      console.log(this.shopName);
      if (mobno.length !== 10) {
        this.reduxService.notification(alertMsg.mobno, alertType.danger);
      } else  if (this.isShopActive && this.shopName && this.shopName.length > 0) {
        if (this.shopName.length > 25) {
          this.reduxService.notification(alertMsg.max25Char, alertType.danger);
          return;
        }
        if (this.shopName.length === 0) {
          this.reduxService.notification(alertMsg.shopName, alertType.danger);
          return;
        }
        this.reduxService.signUp({name: name, email: email, mob_no: mobno, pass: pass, gender: this.gend, shop_name: this.shopName});
      } else {
        this.reduxService.signUp({name: name, email: email, mob_no: mobno, pass: pass, gender: this.gend});
      }
    }  else {
      this.reduxService.notification(alertMsg.fillDetails, alertType.danger);
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

  enableShop(val) {
    this.isShopActive = val;
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
