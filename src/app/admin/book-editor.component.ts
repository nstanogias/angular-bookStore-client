import {Component} from '@angular/core';
import {Book} from '../books/book.model';
import {BookService} from '../books/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html'
})
export class BookEditorComponent {

  editing = false;
  book: Book = new Book();

  constructor(private bookService: BookService, private router: Router, activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params['mode'] === 'edit';
    if (this.editing) {
      Object.assign(this.book,
        bookService.getBook(activeRoute.snapshot.params['id']));
    }
  }

  save(form: NgForm) {
    this.bookService.saveBook(this.book);
    this.router.navigate(['/admin/main/books']);
  }

}
