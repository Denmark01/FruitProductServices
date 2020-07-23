import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditItemComponent } from 'src/app/modals/edit-item/edit-item.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open() {
    const modalRef = this.modalService.open(EditItemComponent);
    modalRef.componentInstance.name = 'World';
  }

}
