import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookListComponent} from './books/book-list/book-list.component';
import {CartDetailComponent} from './cart/cart-detail/cartDetail.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'cart', component: CartDetailComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
