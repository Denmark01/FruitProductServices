import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { select, NgRedux } from 'ng2-redux';
import { IItemFruitState } from '../items-fruit/item.fruit.reducer';
import { AppReduxService } from 'src/app/services/app-redux.service';
import { INCREMENT, DECREMENT, DELETE_CART, DETECT_CART_CHANGE } from '../items-fruit/item-fruit.action';
import { alertMsg, alertType } from 'src/app/utils/config';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit, OnDestroy {

  public cart = [];
  public change_in_cart: boolean;
  public username: string;
  public user_id: string;
  constructor(
    private reduxService: AppReduxService,
    private ngRedux: NgRedux<IItemFruitState>,
    ) { }

  ngOnInit() {
    // this.ngRedux.dispatch({type: DETECT_CART_CHANGE, in_cart_comp: true});

    this. ngRedux.subscribe(() => {
      const store: any = this.ngRedux.getState();
      this.cart = store.itemFruit.cart_item;
      this.change_in_cart = store.itemFruit.change_in_item;
      this.username = store.login.username;
      this.user_id = store.login.userId;
    });

    // const user = localStorage.getItem('userId');
    // this.reduxService.getProfileReduxOnly(user);
    this.reduxService.hitApi();
}

  delete(index) {
    this.ngRedux.dispatch({type: DELETE_CART, index: index, change_in_item: true});
  }


  decrementQty(item_id: number) {
    this.ngRedux.dispatch({type: DECREMENT, item_id: item_id, change_in_item: true});
  }

  incrementQty(item_id: number) {
    this.ngRedux.dispatch({type: INCREMENT, item_id: item_id, change_in_item: true});
  }

  checkout(item) {
    if (this.cart.length > 0) {

    }
  }

  save(item) {
    if (this.change_in_cart) {
    this.reduxService.addToCart(item, this.username);
    } else {
      this.reduxService.notification(alertMsg.noCartChange, alertType.warning);
    }
  }

  ngOnDestroy() {
    // this.ngRedux.dispatch({type: DETECT_CART_CHANGE, in_cart_comp: false});
    if (this.change_in_cart) {
      this.reduxService.addToCart(this.cart, this.username);
    }
    }

}
