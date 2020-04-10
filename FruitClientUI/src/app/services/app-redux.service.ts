import { Injectable } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { NgRedux } from 'ng2-redux';
import { IItemFruitState } from '../components/items-fruit/item.fruit.reducer';
import { START_LOADER, GET_FRUIT_LIST, NOTIFICATION, SAVE_CART} from '../components/items-fruit/item-fruit.action';
import { Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { alertMsg, alertType } from '../utils/config';

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
    private route: Router,
    private ngRedux: NgRedux<IItemFruitState>,
    private alertConfig: NgbAlertConfig,
  ) {
    alertConfig.dismissible = true;
  }

  ngOnit() {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
  }

  notification(msg, msgType) {
    this.ngRedux.dispatch({type: NOTIFICATION, msg: msg, msgType: msgType});
  }

  getItemListRedux() {
    this.appService.getItemList().subscribe(data => {
      console.log('Redux data ' + data);
      this.ngRedux.dispatch({type: GET_FRUIT_LIST, payload: data});
    }, err => {
      console.log('ERROr calling apii....');
    });
  }

  feedbackRedux(name , remarks) {
    this.appService.feedback(name, remarks).subscribe((data) => {
      if (data) {
        this.notification(alertMsg.feedback, alertType.warning);
        this.route.navigate(['']);
      }
    });
  }

  addToCart(item) {
    this.ngRedux.dispatch({type: SAVE_CART, cart_item: item});
  }

}
