import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {BookTableComponent} from './book-table.component';
import {BookEditorComponent} from './book-editor.component';
import {OrderTableComponent} from './order-table.component';
import {AuthGuard} from '../auth/auth.guard';

const routing = RouterModule.forChild([
  {
    path: 'main',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'books/:mode/:id', component: BookEditorComponent},
      {path: 'books/:mode', component: BookEditorComponent},
      {path: 'books', component: BookTableComponent},
      {path: 'orders', component: OrderTableComponent},
      {path: '**', redirectTo: 'books'}
    ]
  },
  {path: '**', redirectTo: 'auth'}
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [ AdminComponent, BookTableComponent, BookEditorComponent, OrderTableComponent]
})
export class AdminModule {
}
