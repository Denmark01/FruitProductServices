import { Injectable } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { NgRedux } from 'ng2-redux';
import { IItemFruitState } from '../components/items-fruit/item.fruit.reducer';
import { START_LOADER, GET_FRUIT_LIST, NOTIFICATION, SAVE_CART, NOTIFICATION_DISAPPEAR} from '../components/items-fruit/item-fruit.action';
import { Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { alertMsg, alertType } from '../utils/config';
import { SAVE_PROFILE } from '../containers/login/login.action';
import { DataShareService } from './data-share.service';

@Injectable({
  providedIn: 'root'
})
export class AppReduxService {

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  staticAlert = false;
  public alertColor: string;

  constructor(
    private appService: AppServiceService,
    private dataShare: DataShareService,
    private route: Router,
    private ngRedux: NgRedux<IItemFruitState>,
    private alertConfig: NgbAlertConfig,
  ) {
   /*  alertConfig.dismissible = true;
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null); */
  }

  ngOnit() {

  }

  notification(msg, msgType) {
    this.ngRedux.dispatch({type: NOTIFICATION, msg: msg, msgType: msgType});
  }

  notificationDisapper() {
    this.ngRedux.dispatch({type: NOTIFICATION_DISAPPEAR});
  }

  getItemListRedux() {
    this.appService.getItemList().subscribe(data => {
      console.log('Redux data ' + data);
      this.ngRedux.dispatch({type: GET_FRUIT_LIST, payload: data});
    }, err => {
      console.log('ERROr calling apii....');
      this.notification(alertMsg.internalError, alertType.danger);
    });
  }

  getProfileRedux(username: string) {
    this.appService.getProfile(username).subscribe(data => {
      this.getCartRedux(data.userId);
      this.ngRedux.dispatch({type: SAVE_PROFILE, roleId: data.roleId, username: data.user, userId: data.userId});
    }, err => {
      console.log('ERROr calling apii....');
      this.notification(alertMsg.internalError, alertType.danger);
    });
  }

  feedbackRedux(name , remarks) {
    this.appService.feedback(name, remarks).subscribe((data) => {
      if (data) {
        this.notification(alertMsg.feedback, alertType.warning);
        this.route.navigate(['']);
      }
    }, error => {
      this.notification(alertMsg.internalError, alertType.danger);
    });
  }

  addToCart(item) {
    this.appService.addToCart(item).subscribe((data) => {
      if (data) {
        if (data.status === 1) {
          this.notification(data.message, alertType.success);
        } else {
          this.notification(data.message, alertType.warning);
        }
      }
    }, error => {
      this.notification(alertMsg.internalError, alertType.danger);
    });

  }

  getCartRedux(userId) {
    this.appService.getAddedCart(userId).subscribe((data) => {
      if (data) {
        const cart = data.cart;
        this.dataShare.replaceCart(cart);
        this.dataShare.changeMessage(cart.length + '');
        console.log(JSON.stringify('Get Cart by user id ' + this.dataShare.getCart()));
        // this.ngRedux.dispatch({type: SAVE_CART, cart_item: data.cart});
      }
    }, error => {
      this.notification(alertMsg.internalError, alertType.danger);
    });

  }

}
