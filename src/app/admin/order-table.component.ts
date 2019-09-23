import {Component} from '@angular/core';
import {OrderService} from '../orders/order.service';
import {Order} from '../orders/order.model';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html'
})
export class OrderTableComponent {

  includeShipped = false;

  constructor(private orderService: OrderService) {}

  getOrders(): Order[] {
    return this.orderService.getOrders()
      .filter(o => this.includeShipped || !o.shipped);
  }

  markShipped(order: Order) {
    order.shipped = true;
    this.orderService.updateOrder(order);
  }

  delete(id: number) {
    this.orderService.deleteOrder(id);
  }
}
