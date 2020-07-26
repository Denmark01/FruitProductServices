import { Injectable } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { NgRedux } from 'ng2-redux';
import { IItemFruitState } from '../components/items-fruit/item.fruit.reducer';
import { START_LOADER, GET_FRUIT_LIST, NOTIFICATION, SAVE_CART, NOTIFICATION_DISAPPEAR,
  CART_LIST, DETECT_CART_CHANGE} from '../components/items-fruit/item-fruit.action';
import { Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { alertMsg, alertType } from '../utils/config';
import { SAVE_PROFILE, LOGIN_LOADER, LOADER_OFF } from '../containers/login/login.action';
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
  public loggIn: string;
  change_in_cart: any;
  constructor(
    private appService: AppServiceService,
    private dataShare: DataShareService,
    private route: Router,
    private ngRedux: NgRedux<IItemFruitState>,
    private alertConfig: NgbAlertConfig,
  ) {
  }

  ngOnit() {
     this.ngRedux.subscribe(() => {
      const store: any = this.ngRedux.getState();
      this.reduxMessage = store.itemFruit.growlMsg;
      this.alertColor = store.itemFruit.growlType;
      this.loggIn = store.login.isLogin;
      this.change_in_cart = store.itemFruit.change_in_item;
    });
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
      const qty1 = [];
      data.product_list.forEach(list => {
        qty1.push({...list, qty : 0});
        });
      this.ngRedux.dispatch({type: GET_FRUIT_LIST, payload: qty1});
      if (this.loggIn && this.change_in_cart) {
        this.ngRedux.dispatch({type: SAVE_CART});
      }
    }, err => {
      this.notification(alertMsg.internalError, alertType.danger);
    });
  }

  getProfileRedux(username: string) {
    this.appService.getProfile(username).subscribe(data => {
      this.getCartRedux(data.userId);
      this.ngRedux.dispatch({type: SAVE_PROFILE, roleId: data.roleId, username: data.user, userId: data.userId,
         shopName: data.shopName});
    }, err => {
      this.notification(alertMsg.internalError, alertType.danger);
    });
  }
  getProfileReduxOnly(username: string) {
    this.appService.getProfile(username).subscribe(data => {
      this.ngRedux.dispatch({type: SAVE_PROFILE, roleId: data.roleId, username: data.user, userId: data.userId,
        shopName: data.shopName});
    }, err => {
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

  addToCart(item, username) {
    this.appService.addToCart({addCartList: item, userId: username}).subscribe((data) => {
        if (data.status === 1) {
          this.notification(data.message, alertType.success);
          this.ngRedux.dispatch({type: DETECT_CART_CHANGE, change_in_item: false});
        } else {
          this.notification(data.message, alertType.warning);
        }
        if (this.change_in_cart) {
          this.ngRedux.dispatch({type: SAVE_CART});
        }
    }, error => {
      this.notification(alertMsg.internalError, alertType.danger);
    });

  }

  getCartRedux(userId) {
    this.appService.getAddedCart(userId).subscribe((data) => {
      if (data) {
        this.ngRedux.dispatch({type: CART_LIST, cart_item: data.cart});
        this.ngRedux.dispatch({type: SAVE_CART});
      }
    }, error => {
      this.notification(alertMsg.internalError, alertType.danger);
    });

  }
  hitApi() {
    this.appService.hitApi().subscribe((data) => {
    }, error => {
      this.ngRedux.dispatch({ type: NOTIFICATION_DISAPPEAR});
    });
  }

  updateItem(payload) {
    this.appService.updateItem(payload).subscribe((data) => {
      if (data.status === 1) {
        this.notification(data.message, alertType.success);
        this.getItemListRedux();
      } else {
        this.notification(data.message, alertType.warning);
      }
    }, error => {
      this.notification(alertMsg.internalError, alertType.danger);
    });
  }

  deleteItem(itemId) {
    this.appService.deleteItem(itemId).subscribe((data) => {
      if (data.status === 1) {
        this.notification(data.message, alertType.success);
        this.getItemListRedux();
      } else {
        this.notification(data.message, alertType.warning);
      }
    }, error => {
      this.notification(alertMsg.internalError, alertType.danger);
    });
  }

  signUp(payload) {
  this.ngRedux.dispatch({type: LOGIN_LOADER});
  this.appService.signUpUser(payload).subscribe((data) => {
    if (data.status === 1) {
      this.notification(data.message, alertType.success);
      this.route.navigate(['/login']);
    } else {
      this.notification(data.message, alertType.warning);
    }
    this.ngRedux.dispatch({type: LOADER_OFF});
  }, error => {
    this.notification(alertMsg.internalError, alertType.danger);
    this.ngRedux.dispatch({type: LOADER_OFF});
  });
}

}
