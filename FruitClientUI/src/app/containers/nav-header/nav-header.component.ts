import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';
import { IItemFruitState } from 'src/app/components/items-fruit/item.fruit.reducer';
import { LOGOUT, SELECT_ITEM, NOTIFICATION_DISAPPEAR } from 'src/app/components/items-fruit/item-fruit.action';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { alertType } from '../../utils/config';
import { SAVE_PROFILE } from '../login/login.action';
import { AppReduxService } from 'src/app/services/app-redux.service';

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
  public isLoggedIn: boolean;
  public isAdmin = false;
  public selectChoice: string;
  public cart_item: any;
  @ViewChild('navbarToggler') navbarToggler: ElementRef;

  @select(s => s.login.username) username;
  @select(s => s.login.user_id) userId;
  constructor(
    private service: DataShareService,
    private route: Router,
    private ngRedux: NgRedux<IItemFruitState>,
    private alertConfig: NgbAlertConfig,
    private reduxService: AppReduxService,
  ) {
    alertConfig.dismissible = true;
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => {
    this.successMessage = null;
    }
    );
  }

  ngOnInit() {
    const user = localStorage.getItem('userId');
    if (user) {
      this.reduxService.getProfileRedux(user);
    }

    // this.reduxService.getCartRedux(this.userId);
    this.token = '';
    this.item_cart = this.service.getCart();
    this.service.currentMessage.subscribe(message => this.count = Number(message));
    console.log(' Message Items-fruits' + this.count);
    this.token = localStorage.getItem('token');

    this.ngRedux.subscribe(() => {
      const store: any = this.ngRedux.getState();
      this.isLoggedIn = store.itemFruit.isLoggedIn;
      this.isAdmin = store.login.is_admin;
      this.selectChoice = store.itemFruit.fruit_vege;
      this._success.next(store.itemFruit.growlMsg);
      this.alertColor = store.itemFruit.growlType;
      this.service.replaceCart([]);
      console.log('Replace cart empty ' + this.service.getCart());
      this.service.setCart(store.itemFruit.cart_item);
      console.log('Set api call ' + this.service.getCart());
    });


  }


  toggle() {
    console.log('toggle');
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
    this.ngRedux.dispatch({ type: LOGOUT });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.service.replaceCart([]);
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
