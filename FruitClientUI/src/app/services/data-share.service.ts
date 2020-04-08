import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private messageSource = new BehaviorSubject('0');
  currentMessage = this.messageSource.asObservable();

  private loginUser = new BehaviorSubject('0');
  loggedInUser = this.loginUser.asObservable();

  public add_cart = [];
  public apiUrl: string;

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  changeLoggedIn(message: string) {
    this.loginUser.next(message);
  }
  public setCart (addCart) {
    this.add_cart.push(addCart);
  }

  public getCart() {
    return this.add_cart;
  }

  public replaceCart(cart) {
    this.add_cart = cart;
  }

  public setUrl(url) {
    this.apiUrl = url;
  }

  public getUrl() {
    return this.apiUrl;
  }
}
