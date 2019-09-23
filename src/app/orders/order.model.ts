import { Injectable } from '@angular/core';
import { Cart } from '../cart/cart.model';

@Injectable( {providedIn: 'root'} )
export class Order {
  public _id: number;
  public name: string;
  public address: string;
  public city: string;
  public state: string;
  public zip: string;
  public country: string;
  public shipped = false;
  constructor(public cart: Cart) { }
  clear() {
    this._id = null;
    this.name = this.address = this.city = null;
    this.state = this.zip = this.country = null;
    this.shipped = false;
    this.cart.clear();
  }
}
