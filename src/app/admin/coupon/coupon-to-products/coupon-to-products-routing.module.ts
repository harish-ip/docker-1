import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponToProductsComponent } from './coupon-to-products.component';

const routes: Routes = [
  { path: '', component: CouponToProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponToProductsRoutingModule { }
