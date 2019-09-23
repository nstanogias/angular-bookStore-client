import {Injectable} from '@angular/core';
import {Book} from './book.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/books/';

@Injectable( {providedIn: 'root'} )
export class BookService {
  private books: Book[] = [];
  private categories: string[] = [];

  constructor(private http: HttpClient) {
    this.http.get<{ message: string; books: any; }>(BACKEND_URL).subscribe(response => {
      this.books = response.books;
      this.categories = response.books.map(book => book.category)
        .filter((category, index, array) => array.indexOf(category) === index).sort();
    });
  }

  getBooks(category: string = null): Book[] {
    return this.books.filter(book => category === null || book.category === category);
  }

  getBook(id: number): Book {
    return this.books.find(book => book._id === id);
  }

  getCategories(): string[] {
    return this.categories;
  }

  saveBook(book: Book) {
    if (book._id == null || book._id === 0) {
      this.http.post<Book>(BACKEND_URL, book)
        .subscribe(response => this.books.push(book));
    } else {
      this.http.put<Book>(BACKEND_URL + book._id, book)
        .subscribe(response => {
          this.books.splice(this.books.
          findIndex(b => b._id === book._id), 1, book);
        });
    }
  }
  deleteBook(id: number) {
    this.http.delete(BACKEND_URL + id).subscribe(response => {
      this.books.splice(this.books.findIndex(b => b._id === id), 1);
    });
  }

}
