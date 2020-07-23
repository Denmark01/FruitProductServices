import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IItemFruitState } from 'src/app/components/items-fruit/item.fruit.reducer';
import { AppServiceService } from 'src/app/services/app-service.service';
import { AppReduxService } from 'src/app/services/app-redux.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(
    private appRedux: AppReduxService
  ) { }

  ngOnInit() {
  }

  feedbackSubmit(name , remarks) {
    this.appRedux.feedbackRedux(name, remarks);
  }

}
