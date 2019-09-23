import {Component} from '@angular/core';
import {BookService} from '../book.service';
import {Book} from '../book.model';
import {Cart} from '../../cart/cart.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: 'book-list.component.html'
})

export class BookListComponent {
  public selectedCategory = null;
  public booksPerPage = 4;
  public selectedPage = 1;

  constructor(private bookService: BookService, private cart: Cart, private router: Router) {
  }

  get books(): Book[] {
    const pageIndex = (this.selectedPage - 1) * this.booksPerPage;
    return this.bookService.getBooks(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.booksPerPage);
  }

  get categories(): string[] {
    return this.bookService.getCategories();
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
  }


  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number) {
    this.booksPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.bookService
      .getBooks(this.selectedCategory).length / this.booksPerPage))
      .fill(0).map((x, i) => i + 1);
  }

  addBookToCart(book: Book) {
    this.cart.addLine(book);
    this.router.navigateByUrl('/cart');
  }
}
