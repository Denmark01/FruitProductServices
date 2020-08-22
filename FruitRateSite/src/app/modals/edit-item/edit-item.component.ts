import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppReduxService } from 'src/app/services/app-redux.service';
import { alertType, alertMsg } from 'src/app/utils/config';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  @Input() payload;
  public item: any;
  public noChangeMsg: string;
  public isStock: string;
  public deleteAction = false;

  constructor(public activeModal: NgbActiveModal,
    private reduxService: AppReduxService) {}

  ngOnInit() {
    this.item = this.payload.item;
  }

  stock(val) {
    this.isStock = val;
    console.log(this.isStock);
  }

  update(name, delivery, price, weight, maxQty) {
    const changeItem = [name, this.payload.item.delivery, price, weight, maxQty, this.isStock];
    const popupItem = [this.payload.item.name, this.payload.item.delivery, this.payload.item.price,
      this.payload.item.weight, this.payload.item.max_qty, this.payload.item.stock];

  if (popupItem.toString() !== changeItem.toString()) {
      this.reduxService.updateItem({name: name, delivery: delivery, price: price, weight: weight,
        max_qty: maxQty, item_id: this.item.item_id, stock: this.isStock});
        this.activeModal.close();
    } else {
  this.noChangeMsg = alertMsg.editNoChangeItem;
  }
}

deleteAct(val) {
  this.deleteAction = val;
}

  delete(itemId) {
    this.reduxService.deleteItem(itemId);
    this.activeModal.close();
  }

}
