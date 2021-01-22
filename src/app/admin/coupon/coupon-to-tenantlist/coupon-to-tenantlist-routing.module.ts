import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponToTenantlistComponent } from './coupon-to-tenantlist.component';

const routes: Routes = [
  { path: '', component: CouponToTenantlistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponToTenantlistRoutingModule { }
