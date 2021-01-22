import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponToTenantlistRoutingModule } from './coupon-to-tenantlist-routing.module';
import { CouponToTenantlistComponent } from './coupon-to-tenantlist.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CouponToTenantlistComponent],
  imports: [
    CommonModule,
    FormsModule,
    CouponToTenantlistRoutingModule
  ]
})
export class CouponToTenantlistModule { }
