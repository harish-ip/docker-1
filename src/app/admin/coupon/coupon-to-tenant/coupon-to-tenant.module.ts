import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CouponToTenantRoutingModule } from './coupon-to-tenant-routing.module';
import { CouponToTenantComponent } from './coupon-to-tenant.component';

@NgModule({
  declarations: [CouponToTenantComponent],
  imports: [
    CommonModule,
    FormsModule,
    CouponToTenantRoutingModule
  ]
})
export class CouponToTenantModule { }
