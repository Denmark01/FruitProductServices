import { Component, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataShareService } from 'src/app/services/data-share.service';
import { AppServiceService } from 'src/app/services/app-service.service';
import {alertType, alertMsg} from '../../utils/config';
import { NgRedux, select } from 'ng2-redux';
import { IItemFruitState } from './item.fruit.reducer';
import { INCREMENT, NOTIFICATION } from './item-fruit.action';
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
    @select(s => s.itemFruit.counter) counter;
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
    this.reduxService.getItemListRedux();

    this. ngRedux.subscribe(() => {
      const store: any = this.ngRedux.getState();
      this.isLoading = store.itemFruit.item_loader;
    const temp = store.itemFruit.item_list;
    console.log('Item list ' + temp);
    let qty1 = [];
    temp.forEach(list => {
      qty1.push({...list, qty : 0});
      });
      this.product_list = qty1;
      this.temp_item = this.dataShare.getCart();
      for (let i = 0; i < this.temp_item.length; i++) {
      const val = this.product_list.filter(e => e.item_id === this.temp_item[i].item_id);
      if (val.length > 0) {
        this.product_list.forEach(data => {
          if (this.temp_item[i].item_id === data.item_id) {
            data.qty = this.temp_item[i].qty;
          }
        });
      }
    }
    });

    this.product_list1 = [
      {image : '/fruit.jpg',
      name : 'Onion / Pyaaz', delivery: 'Delivery within 1 hour',
      price : '30', weight : 'KG', qty: 0, item_id: 101},
      {image : 'assets/image/399.jpg', name : 'Deluxe Wedding Basket', delivery: 'Delivery within two days',
       price : '1020.00', weight : 'NA', qty: 0, item_id: 102}
    ];



    // setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
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

  addToCart(item, action) {
      if (item.qty === 0) {
        this.reduxService.notification(alertMsg.addQty, alertType.warning);
      } else {
        const sameItem = this.service.getCart().filter(e => e.qty === item.qty && e.item_id === item.item_id);
        console.log('Same item added ' + sameItem + ' ' + sameItem.length);
        if (sameItem.length > 0) {
          this.reduxService.notification(alertMsg.alreadyAdded, alertType.warning);
        } else {
          const qtyChange = this.service.getCart().filter(e => e.qty !== item.qty && e.item_id === item.item_id);
          if (qtyChange.length > 0 && this.service.getCart().length > 0) {
            this.service.getCart().forEach(data => {
              if (data.item_id === item.item_id) {
                data.qty = item.qty;
              }
            });
            this.reduxService.addToCart(this.service.getCart());
            this.reduxService.notification(alertMsg.cartUpadted, alertType.success);
          } else {
            // this.service.setCart({ 'price': item.price, 'name': item.name, 'item_id': item.item_id, 'qty': item.qty });
            this.service.setCart({...item});
            this.reduxService.addToCart(this.service.getCart());
            const len = this.service.getCart().length;
            this.service.currentMessage.subscribe(message => this.countCart = message);
            this.service.changeMessage(len + '');
            console.log('Cart ' + JSON.stringify(this.service.getCart()));
            // this._success.next('Added in cart');
            // this.alertColor = alertType.success;
            this.reduxService.notification(alertMsg.itemAdded, alertType.success);
          }
        }
      }
  }

  close() {
 }

  decrementQty(index: number) {
    if (this.product_list[index].qty - 1 < 0) {
      this.product_list[index].qty = 0;
      console.log('item_1-> ' + this.product_list[index].qty);
    } else {
      this.product_list[index].qty -= 1;
      console.log('item_2-> ' + index + '  ' + this.product_list[index].qty);
    }
  }
  incrementQty(index: number) {
      this.product_list[index].qty += 1;
      console.log('item_2-> ' + index + '  ' + this.product_list[index].qty);
  }
}
