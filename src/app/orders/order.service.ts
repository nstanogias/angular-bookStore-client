import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from './order.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + '/orders/';

@Injectable({providedIn: 'root'})
export class OrderService {
  private orders: Order[] = [];
  private loaded = false;

  constructor(private http: HttpClient) {}

  loadOrders() {
    this.loaded = true;
    this.http.get<{ message: string; orders: any; }>(BACKEND_URL).subscribe(response => {
      this.orders = response.orders;
    });
  }

  getOrders(): Order[] {
    if (!this.loaded) {
      this.loadOrders();
    }
    return this.orders;
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(BACKEND_URL, order);
  }

  updateOrder(order: Order) {
    this.http.put<Order>(BACKEND_URL + order._id, order).subscribe(response => {
      this.orders.splice(this.orders.findIndex(o => o._id === order._id), 1, order);
    });
  }

  deleteOrder(id: number) {
    this.http.delete(BACKEND_URL + id).subscribe(response => {
      this.orders.splice(this.orders.findIndex(o => id === o._id));
    });
  }
}
