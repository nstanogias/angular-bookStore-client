import { Component } from '@angular/core';
import {OrderService} from '../orders/order.service';
import {Order} from '../orders/order.model';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.scss']
})

export class CheckoutComponent {
  orderSent = false;
  submitted = false;
  errorMessage: string = null;

  constructor(private orderService: OrderService, public order: Order) {}

  submitOrder(form: NgForm) {
    this.submitted = true;
    if (this.order.cart.itemCount === 0) {
      this.errorMessage = 'You cannot place an order with empty cart!';
    } else {
      if (form.valid) {
        this.orderService.saveOrder(this.order).subscribe(order => {
          this.order.clear();
          this.orderSent = true;
          this.submitted = false;
        });
      }
    }
  }

  onHandleError() {
    this.errorMessage = null;
  }
}
