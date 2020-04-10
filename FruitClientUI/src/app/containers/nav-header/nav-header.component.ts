import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';
import { IItemFruitState } from 'src/app/components/items-fruit/item.fruit.reducer';
import { LOGOUT } from 'src/app/components/items-fruit/item-fruit.action';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {alertType} from '../../utils/config';

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
  public isAdmin: boolean;
  @ViewChild('navbarToggler') navbarToggler: ElementRef;

  @select(s => s.itemFruit.item_list) item_list;
  // @select(s => s.itemFruit.isLoggedIn) isLoggedIn;

  constructor(
    private service: DataShareService,
    private route: Router,
    private ngRedux: NgRedux<IItemFruitState>,
    private alertConfig: NgbAlertConfig,
    ) {
      alertConfig.dismissible = true;
    }

  ngOnInit() {
    this.token = '';
    this.item_cart = this.service.getCart();
    // /* this.service.currentMessage.subscribe(message => this.message = message);
    // console.log(' Message Items-fruits' + this.message); */
    this.service.currentMessage.subscribe(message => this.count = Number(message));
    // this.service.loggedInUser.subscribe(data => this.loginName = data);
    console.log(' Message Items-fruits' + this.count);
    // this.loginName = localStorage.getItem('logEmail');
    // this.loginName = 'Welcome ' + this.loginName.substring(0, this.loginName.indexOf('@')) + '!';
    this.token = localStorage.getItem('token');

    console.log('Token ' + this.token);
    console.log('Item list' + this.item_list);
    console.log('Is logged in ' + this.isLoggedIn);


    this. ngRedux.subscribe(() => {
      const store: any = this.ngRedux.getState();
      this.isLoggedIn = store.itemFruit.isLoggedIn;
      this.isAdmin = store.login.is_admin;
      this._success.next(store.itemFruit.growlMsg);
      this.alertColor = store.itemFruit.growlType;
    });

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);

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
    this.ngRedux.dispatch({type: LOGOUT});
    localStorage.removeItem('token');
    this.route.navigate(['feedback']);
  }
  alert() {
    this._success.next('Added in cart');
    this.alertColor = alertType.success;
  }
}
