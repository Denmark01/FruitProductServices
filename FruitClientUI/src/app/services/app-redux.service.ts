import { Injectable } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { NgRedux } from 'ng2-redux';
import { IItemFruitState } from '../components/items-fruit/item.fruit.reducer';
import { START_LOADER, GET_FRUIT_LIST, NOTIFICATION, SAVE_CART, NOTIFICATION_DISAPPEAR, CART_LIST} from '../components/items-fruit/item-fruit.action';
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
  public reduxMessage: string;
  constructor(
    private appService: AppServiceService,
    private dataShare: DataShareService,
    private route: Router,
    private ngRedux: NgRedux<IItemFruitState>,
    private alertConfig: NgbAlertConfig,
  ) {
    // alertConfig.dismissible = true;
    // this._success.subscribe((message) => this.successMessage = message);
    // this._success.pipe(
    //   debounceTime(3000)
    // ).subscribe(() => this.successMessage = null);
  }

  ngOnit() {
     this.ngRedux.subscribe(() => {
      const store: any = this.ngRedux.getState();
      this.reduxMessage = store.itemFruit.growlMsg;
      this.alertColor = store.itemFruit.growlType;
    });
  }

  notification(msg, msgType) {
    // this.dataShare.setGrowl(msg, msgType);
    // this._success.next(msg);
    // this.alertColor = msgType;
    this.ngRedux.dispatch({type: NOTIFICATION, msg: msg, msgType: msgType});
    // this._success.pipe(
    //   debounceTime(3000)
    // ).subscribe(() => {
    // this.ngRedux.dispatch({ type: NOTIFICATION_DISAPPEAR, message:  this.successMessage});
    // });
  }

/*   public GetCurrentUserDelayedTest(): Observable<User>
{
    return of(new User(""))
       .pipe(delay(2000));
} */

  notificationDisapper() {
    this.ngRedux.dispatch({type: NOTIFICATION_DISAPPEAR});
  }

  getItemListRedux() {
    this.appService.getItemList().subscribe(data => {
      console.log('Redux data ' + data);
      const qty1 = [];
      data.product_list.forEach(list => {
        qty1.push({...list, qty : 0});
        });
      this.ngRedux.dispatch({type: GET_FRUIT_LIST, payload: qty1});
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
  getProfileReduxOnly(username: string) {
    this.appService.getProfile(username).subscribe(data => {
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
        this.ngRedux.dispatch({type: CART_LIST, cart_item: data.cart});
        this.ngRedux.dispatch({type: SAVE_CART, cart_item: data.cart});
      }
    }, error => {
      this.notification(alertMsg.internalError, alertType.danger);
    });

  }

}
