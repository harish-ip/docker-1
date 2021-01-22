import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponToProductlistComponent } from './coupon-to-productlist.component';

const routes: Routes = [
  { path: '', component: CouponToProductlistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CouponToProductlistRoutingModule { }
