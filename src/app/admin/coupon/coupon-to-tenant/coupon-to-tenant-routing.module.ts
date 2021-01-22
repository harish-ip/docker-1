import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponToTenantComponent } from './coupon-to-tenant.component';

const routes: Routes = [
  { path: '', component: CouponToTenantComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponToTenantRoutingModule { }
