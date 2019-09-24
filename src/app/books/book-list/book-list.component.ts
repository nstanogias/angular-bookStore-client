import {Component} from '@angular/core';
import {BookService} from '../book.service';
import {Book} from '../book.model';
import {Cart} from '../../cart/cart.model';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-book-list',
  templateUrl: 'book-list.component.html'
})

export class BookListComponent {
  selectedCategory = null;
  booksPerPage = 4;
  selectedPage = 1;
  errorMessage: string = null;

  constructor(private bookService: BookService, private cart: Cart, private router: Router, private authService: AuthService) {}

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
    if (!this.authService.getIsAuth()) {
      this.errorMessage = 'You must log in first!';
    } else {
      this.cart.addLine(book);
      this.router.navigate(['/cart']);
    }
  }

  onHandleError() {
    this.errorMessage = null;
  }
}
