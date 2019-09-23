import { Component, OnInit } from '@angular/core';
import {BookService} from '../books/book.service';
import {Book} from '../books/book.model';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html'
})
export class BookTableComponent {

  constructor(private bookService: BookService) { }

  getBooks(): Book[] {
    return this.bookService.getBooks();
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id);
  }
}
