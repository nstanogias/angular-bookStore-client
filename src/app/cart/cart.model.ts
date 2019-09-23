import {Book} from '../books/book.model';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Cart {
  public lines: CartLine[] = [];
  public itemCount = 0;
  public cartPrice = 0;

  addLine(book: Book, quantity: number = 1) {
    const line = this.lines.find(l => l.book._id === book._id);
    if (line !== undefined) {
      line.quantity += quantity;
    } else {
      this.lines.push(new CartLine(book, quantity));
    }
    this.recalculate();
  }

  updateQuantity(book: Book, quantity: number) {
    const line = this.lines.find(l => l.book._id === book._id);
    if (line !== undefined) {
      line.quantity = Number(quantity);
    }
    this.recalculate();
  }

  removeLine(id: number) {
    const index = this.lines.findIndex(line => line.book._id === id);
    this.lines.splice(index, 1);
    this.recalculate();
  }

  clear() {
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }

  private recalculate() {
    this.itemCount = 0;
    this.cartPrice = 0;
    this.lines.forEach(l => {
      this.itemCount += l.quantity;
      this.cartPrice += (l.quantity * l.book.price);
    });
  }
}

export class CartLine {
  constructor(public book: Book, public quantity: number) {
  }

  get lineTotal() {
    return this.quantity * this.book.price;
  }
}
