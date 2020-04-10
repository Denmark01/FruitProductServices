import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import { AuthService } from 'src/app/auth.service';
import { NgRedux } from 'ng2-redux';
import { LoginState } from './login.reducer';


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

  constructor(private http: HttpClient,
    private route: Router,
    private service: DataShareService,
    private authService: AuthService,
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
    console.log('Email and password ' + email + ' ' + password);
    const param = { 'email': email, 'password': password};
    this.authService.login(email, password);
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
