import { Component, OnInit, isDevMode} from '@angular/core';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataShareService } from 'src/app/services/data-share.service';
import { AppServiceService } from 'src/app/services/app-service.service';
import {alertType, alertMsg} from '../../utils/config';
import { NgRedux, select } from 'ng2-redux';
import { IItemFruitState } from './item.fruit.reducer';
import { INCREMENT, NOTIFICATION, UPDATE_CART_ITEM, DECREMENT, UPDATE_QTY } from './item-fruit.action';
import { AppReduxService } from 'src/app/services/app-redux.service';
@Component({
  selector: 'app-items-fruit',
  templateUrl: './items-fruit.component.html',
  styleUrls: ['./items-fruit.component.css'],
  providers: [NgbAlertConfig]
})
export class ItemsFruitComponent implements OnInit {
  public searchText: string;
  public product_list = [];
  public qty: any;
   public product_list1: any;
  public countCart: string;
  // private _disabledV: string = '0';
  // private disabled: boolean = false;
  public itemData: any;
    private _success = new Subject<string>();
  public temp_item: any;
    staticAlertClosed = false;
    successMessage: string;
    staticAlert = false;
    public alertColor: string;
    public isLoading: boolean;
    public added_cart: any;
    @select(s => s.itemFruit.counter) counter;
    isLoggedIn: boolean;
    isLogged: boolean;
    // @select(s => s.itemFruit.item_loader)isLoading;
    // @select(s => s.itemFruit.item_list) item_list;
    constructor(
      private alertConfig: NgbAlertConfig,
      private http: HttpClient,
      private service: DataShareService,
      private reduxService: AppReduxService,
      private dataShare: DataShareService,
      private ngRedux: NgRedux<IItemFruitState>
      ) {
      // customize default values of alerts used by this component tree
      // alertConfig.type = 'success';
      alertConfig.dismissible = true;
      }

  ngOnInit() {

    this.ngRedux.subscribe(() => {
      const store: any = this.ngRedux.getState();
      this.isLoading = store.itemFruit.item_loader;
      this.isLoggedIn = store.itemFruit.isLoggedIn;
      this.searchText = store.itemFruit.fruit_vege;
      this.product_list = store.itemFruit.item_list;
      this.added_cart = store.itemFruit.cart_item;
      this.isLogged = store.login.isLogin;
    });

    if (isDevMode()) {
      this.product_list = [
        {
          image: '/fruit.jpg',
          name: 'Onion / Pyaaz', delivery: 'Delivery within 1 hour',
          price: '30', weight: 'KG', qty: 0, item_id: 101
        },
        {
          image: 'assets/image/399.jpg', name: 'Deluxe Wedding Basket', delivery: 'Delivery within two days',
          price: '1020.00', weight: 'NA', qty: 0, item_id: 102
        }
      ];
    } else {
        this.reduxService.getItemListRedux();

    }

    /* let counter = 0;
    for (let i = 0 ; i < this.product_list.length; i++) {
      const val = this.product_list.filter(e => e.item_id === this.added_cart[i].item_id);
       if (val.length > 0) {
        this.product_list.forEach(data => {
               if (data.item_id === this.added_cart[i].item_id) {
                   data.qty = this.added_cart[i].qty;
                   counter ++;
               }
           });
       }
    }
    console.log('Counter ' + counter);
    if (counter > 0) {
      this.ngRedux.dispatch({type : UPDATE_QTY, for: 'ITEM_UPDATE', item_list: this.product_list});
    } */

  }

  increment() {
    this.ngRedux.dispatch({type: INCREMENT});
  }

  receiveMessage($event) {
    this.searchText = $event;
  }
/*   private get disabledV(): string {
    return this._disabledV;
  }
  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
 */

  addToCart(item) {
    if (item.qty === 0) {
      this.reduxService.notification(alertMsg.addQty, alertType.warning);
    } else {
      const sameItem = this.added_cart.filter(e => e.qty === item.qty && e.item_id === item.item_id);
      console.log('Same item added ' + sameItem + ' ' + sameItem.length);
      if (sameItem.length > 0) {
        this.reduxService.notification(alertMsg.alreadyAdded, alertType.warning);
      } else {
        const qtyChange =  this.added_cart.filter(e => e.qty !== item.qty && e.item_id === item.item_id);
        if (qtyChange.length > 0 &&  this.added_cart.length > 0) {
          this.ngRedux.dispatch({type: UPDATE_CART_ITEM, action: 'UPDATE', item: item});
          this.reduxService.notification(alertMsg.cartUpadted, alertType.success);
        } else {
          this.ngRedux.dispatch({type: UPDATE_CART_ITEM, action: 'ADD', item: item});
          this.reduxService.notification(alertMsg.itemAdded, alertType.success);
        }
      }
    }
}


  decrementQty(item_id: number) {
    this.ngRedux.dispatch({type: DECREMENT, item_id: item_id, action : 'MAIN'});
  }

  incrementQty(item_id: number) {
    this.ngRedux.dispatch({type: INCREMENT, item_id: item_id,  action : 'MAIN'});
  }
}
