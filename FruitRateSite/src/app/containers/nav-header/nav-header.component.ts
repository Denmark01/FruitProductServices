import { Component, OnInit, ElementRef, ViewChild, isDevMode } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';
import { IItemFruitState } from 'src/app/components/items-fruit/item.fruit.reducer';
import { LOGOUT, SELECT_ITEM, NOTIFICATION_DISAPPEAR, EMPTY_ALL, } from 'src/app/components/items-fruit/item-fruit.action';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { alertType } from '../../utils/config';
import { SAVE_PROFILE } from '../login/login.action';
import { AppReduxService } from 'src/app/services/app-redux.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  staticAlert = false;
  public alertColor: string;

  public item_cart = [];
  count: number;
  public token: string;
  public isLoggedIn = false;
  public isAdmin = false;
  // public selectChoice: string;
  public selectChoice: string;
  public cart_item: any;
  public userId = 0;
  public growl: any;
  public username: string;
  @ViewChild('navbarToggler') navbarToggler: ElementRef;

  navTrue: boolean;
  loggIn: boolean;
  roleId: number;
  // @select(s => s.login.user_id) userId;
  constructor(
    private service: DataShareService,
    private route: Router,
    private ngRedux: NgRedux<IItemFruitState>,
    private alertConfig: NgbAlertConfig,
    private reduxService: AppReduxService,
  ) {
    this.growl = this.service.getGrowl();

    alertConfig.dismissible = true;
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => {
      if (this.successMessage) {
        this.ngRedux.dispatch({ type: NOTIFICATION_DISAPPEAR });
        // this.successMessage = null;
      }
    }
    );
  }

  ngOnInit() {
    if (isDevMode) {
      this.selectChoice = 'FRUITS';
      this.navTrue = true;
    }

    this.token = localStorage.getItem('token');

    this.ngRedux.subscribe(() => {
      const store: any = this.ngRedux.getState();
      this.isLoggedIn = store.itemFruit.isLoggedIn;
      this.isAdmin = store.login.is_admin;
      this.selectChoice = store.itemFruit.fruit_vege;
      this.count = store.itemFruit.cart_qty;
      this.loggIn = store.login.isLogin;
      this._success.next(store.itemFruit.growlMsg);
      this.alertColor = store.itemFruit.growlType;
      this.username = store.login.username;
      this.roleId = store.login.roleId;
    });

    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);

    if (decoded) {
      this.reduxService.getProfileReduxOnly(decoded.sub);
    }

  }


  toggle() {
    this.navbarToggler.nativeElement.click();
  }

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }

  logout() {
    this.navbarToggler.nativeElement.click();
    this.ngRedux.dispatch({ type: LOGOUT });
    this.ngRedux.dispatch({ type: EMPTY_ALL });
    this.navTrue = false;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.route.navigate(['feedback']);
  }
  alert() {
    this._success.next('Added in cart');
    this.alertColor = alertType.success;
  }

  select(choice) {
    this.ngRedux.dispatch({ type: SELECT_ITEM, fruit_vege: choice });
  }

}
