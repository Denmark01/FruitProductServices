import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { config } from '../utils/config';
import { HttpClient } from '@angular/common/http';
import { DataShareService } from './data-share.service';
import { NgRedux } from 'ng2-redux';
import { IItemFruitState } from '../components/items-fruit/item.fruit.reducer';
import { START_LOADER } from '../components/items-fruit/item-fruit.action';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  public userId: string;
  public unique_id: string;
constructor(private http: HttpClient,
  private app: DataShareService,
  private ngRedux: NgRedux<IItemFruitState>) {

    this. ngRedux.subscribe(() => {
      const store: any = this.ngRedux.getState();
      this.userId = store.login.username;
      this.unique_id = store.login.userId;
    });
}

// public userId: string = localStorage.getItem('userId');


  getItemList() {
    const url = environment.apiUrl + config.api.getItems;
    this.ngRedux.dispatch({type: START_LOADER});
    const response: any = this.http.get(url);
    return response;
  }

  // getItemListRedux() {
  //   const url = environment.apiUrl + config.api.getItems;

  //   this.ngRedux.dispatch({type: START_LOADER});

  //   this.getItemList().subscribe(data => {
  //     console.log('Redux data ' + data);
  //     this.ngRedux.dispatch({type: GET_FRUIT_LIST, payload: data});
  //   }, err => {
  //     console.log('ERROr calling apii....');
  //   });
  // }

  uploadItems(formData, val) {
    const url = environment.apiUrl + config.api.uploadItems;
    console.log(url);
    const response: any = this.http.post(url, formData, val);
    return response;
  }

  uploadMultipleImage(formData, val) {
    const url = environment.apiUrl + config.api.uploadImage;
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

  feedback(name, remarks) {
    const data = {name: name, comments: remarks, userId: this.userId};
    const url = environment.apiUrl + config.api.feedback;
    const response: any = this.http.post(url, data);
    return response;
  }

  addToCart(payload) {
    // const data = {addCartList: payload, userId: this.userId};
    const url = environment.apiUrl + config.api.addToCart;
    const response: any = this.http.post(url, payload);
    return response;
  }

  getProfile(user) {
    const url = environment.apiUrl + config.api.getProfile + '?username=' + user;
    const response: any = this.http.get(url);
    return response;
  }

  getAddedCart(userId) {
    const url = environment.apiUrl + config.api.getCart + '?userid=' + userId;
    const response: any = this.http.get(url);
    return response;
  }

  hitApi() {
    const url = environment.apiUrl + config.api.callApi;
    const response: any = this.http.get(url);
    return response;
  }

  updateItem(payload) {
    const url = environment.apiUrl + config.api.updateItem;
    const response: any = this.http.post(url, payload);
    return response;
  }

  deleteItem(itemId) {
    const url = environment.apiUrl + config.api.deleteItem + '?item_id=' + itemId;
    const response: any = this.http.get(url);
    return response;
  }

  getImageName() {
    const url = environment.apiUrl + config.api.getImageName;
    const response: any = this.http.get(url);
    return response;
  }

  signUpUser(payload) {
    const url = environment.apiUrl + config.api.signUp;
    const response: any = this.http.post(url, payload);
    return response;
  }

  getSubCatName(subCat) {
    const url = environment.apiUrl + config.api.getSubCat + '?sub_cat=' + subCat;
    const response: any = this.http.get(url);
    return response;
  }
}
