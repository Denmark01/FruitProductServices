import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { select, NgRedux } from 'ng2-redux';
import { IItemFruitState } from '../items-fruit/item.fruit.reducer';
import { AppReduxService } from 'src/app/services/app-redux.service';
import { INCREMENT, DECREMENT, DELETE_CART, UPDATE_QTY } from '../items-fruit/item-fruit.action';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit, OnDestroy {

  public cart = [];

  // @select(s => s.itemFruit.item_list) item_list;
  @select(s => s.login.user_id) userId;
  // @select(s => s.itemFruit.cart_item)product_list;

  constructor(
    private reduxService: AppReduxService,
    private ngRedux: NgRedux<IItemFruitState>,
    ) { }

  ngOnInit() {

    this. ngRedux.subscribe(() => {
      const store: any = this.ngRedux.getState();
      this.cart = store.itemFruit.cart_item;
    });

    const user = localStorage.getItem('userId');
    this.reduxService.getProfileReduxOnly(user);
}

  delete(index) {
    this.ngRedux.dispatch({type: DELETE_CART, index: index});
  }


  decrementQty(item_id: number) {
    this.ngRedux.dispatch({type: DECREMENT, item_id: item_id});
  }

  incrementQty(item_id: number) {
    this.ngRedux.dispatch({type: INCREMENT, item_id: item_id});
  }

  ngOnDestroy() {
    this.reduxService.addToCart(this.cart);
   /*  let counter = 0;
    for (let i = 0 ; i < this.product_list.length; i++) {
      const val = this.product_list.filter(e => e.item_id === this.cart_list[i].item_id);
       if (val.length > 0) {
        this.product_list.forEach(data => {
               if (data.item_id === this.cart_list[i].item_id) {
                   data.qty = this.cart_list[i].qty;
                   counter ++;
               }
           });
       } */
    /*    if (counter > 0) {
        this.ngRedux.dispatch({type : UPDATE_QTY, for: 'ITEM_UPDATE', item_list: this.product_list});
      }
      this.ngRedux.dispatch({type: UPDATE_QTY});
    } */
    }


  checkout(item) {
    if (this.cart.length > 0) {

    }
  }

  save(item) {
    this.reduxService.addToCart(item);
  }

}
