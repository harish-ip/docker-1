import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponListComponent } from './coupon-list.component';

const routes: Routes = [
  { path: '', component: CouponListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponListRoutingModule { }
