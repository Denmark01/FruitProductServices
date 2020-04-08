import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { config } from '../utils/config';
import { HttpClient } from '@angular/common/http';
import { DataShareService } from './data-share.service';
import { NgRedux } from 'ng2-redux';
import { IItemFruitState } from '../components/items-fruit/item.fruit.reducer';
import { GET_FRUIT_LIST, START_LOADER } from '../components/items-fruit/item-fruit.action';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
constructor(private http: HttpClient,
  private app: DataShareService,
  private ngRedux: NgRedux<IItemFruitState>) {
}
  getItemList() {
    const url = environment.apiUrl + config.api.getItems;
    console.log(url);
    const response: any = this.http.get(url);
    return response;
  }

  getItemListRedux() {
    const url = environment.apiUrl + config.api.getItems;

    this.ngRedux.dispatch({type: START_LOADER});

    this.getItemList().subscribe(data => {
      console.log('Redux data ' + data);
      this.ngRedux.dispatch({type: GET_FRUIT_LIST, payload: data});
    }, err => {
      console.log('ERROr calling apii....');
    });
  }

  uploadItems(formData, val) {
    const url = environment.apiUrl + config.api.uploadItems;
    console.log(url);
    const response: any = this.http.post(url, formData, val);
    return response;
  }

  login(user, pass) {
    const data = {username: user, password: pass};
    const url = environment.apiUrl + config.api.auth;
    const response: any = this.http.post(url, data);
    return response;
  }
}
