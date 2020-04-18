import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { select, NgRedux } from 'ng2-redux';
import { IItemFruitState } from '../items-fruit/item.fruit.reducer';
import { AppReduxService } from 'src/app/services/app-redux.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit, OnDestroy {

  public product_list: any;

  @select(s => s.itemFruit.item_list) item_list;

  constructor(private dataShare: DataShareService,
    private service: DataShareService,
    private reduxService: AppReduxService,
    private ngRedux: NgRedux<IItemFruitState>,
    ) { }

  ngOnInit() {
    this.product_list = this.dataShare.getCart();
    // this.product_list = this.item_list;
    if (this.product_list.length === 0) {
      this.service.changeMessage(0 + '');
    }
  //   this.ngRedux.subscribe(() => {
  //     const store: any = this.ngRedux.getState();
  //     this.product_list = store.itemFruit.cart_item;
  //     console.log('Add Cart comp :: product list ' + store.itemFruit.cart_item);
  //     if (this.product_list.length === 0) {
  //       this.service.changeMessage(0 + '');
  //     }
  // });
}

  delete(index) {
    this.product_list[index].qty = 0;
    this.product_list.splice(index, 1);
    console.log('Card product list ' + this.product_list.length);
    if (this.product_list.length === 0) {
      this.service.changeMessage(this.product_list.length + '');
    } else {
      this.service.changeMessage(this.product_list.length + '');
    }
  }

  /* decrementQty(index: number) {
    if (this.product_list[index].qty - 1 < 1) {
      this.product_list[index].qty = 1;
      console.log('item_1-> ' + this.product_list[index].qty);
    } else {
      this.product_list[index].qty -= 1;
      console.log('item_2-> ' + index + '  ' + this.product_list[index].qty);
    }
  }
  incrementQty(index: number) {
      this.product_list[index].qty += 1;
      console.log('item_2-> ' + index + '  ' + this.product_list[index].qty);
  } */

  decrementQty(item_id: number) {
    for (let i = 0; i < this.product_list.length; i++) {
      if (this.product_list[i] === item_id) {
        if (this.product_list[i].qty - 1 < 1) {
          this.product_list[i].qty = 1;
          break;
        } else {
          this.product_list[i].qty -= 1;
        }
      }
    }
  }

  incrementQty(item_id: number) {
    for (let i = 0; i < this.product_list.length; i++) {
      if (this.product_list[i].item_id === item_id) {
        if (this.product_list[i].qty + 1 <= this.product_list[i].max_qty) {
          this.product_list[i].qty += 1;
          break;
        }
      }
    }
  }

  ngOnDestroy() {
    this.dataShare.replaceCart(this.product_list);
    console.log(this.dataShare.getCart());
    // this.reduxService.addToCart(this.service.getCart());
  }

  checkout(item) {
    if (this.product_list.length > 0) {

    }
  }

  save(item) {
    this.reduxService.addToCart(item);
  }

}
