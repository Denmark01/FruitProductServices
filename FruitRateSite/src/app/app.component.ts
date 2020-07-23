import { Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataShareService } from './services/data-share.service';
import { NgRedux } from 'ng2-redux';
import { IItemFruitState } from './components/items-fruit/item.fruit.reducer';
import { AppReduxService } from './services/app-redux.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
public data: any;
public isLoggedIn: boolean;
constructor(
  private modalService: NgbModal,
  private route: Router,
  private ngRedux: NgRedux<IItemFruitState>,
  private reduxService: AppReduxService,
  ) {}

// tslint:disable-next-line: use-life-cycle-interface
ngOnInit() {
  console.log('Current url ' + this.route.url);
  const s = location.href;

  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwt_decode(token);

    if (decoded) {
      this.reduxService.getProfileRedux(decoded.sub);
    }
  }

  this.ngRedux.subscribe(() => {
    const store: any = this.ngRedux.getState();
    this.isLoggedIn = store.login.isLogin;
  });
 /*  if (this.isLoggedIn) {
    this.reduxService.getItemListRedux();
    const user = localStorage.getItem('userId');
    this.reduxService.getProfileRedux(user);
  } */
}

}
