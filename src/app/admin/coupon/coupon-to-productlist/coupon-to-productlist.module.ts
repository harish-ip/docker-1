import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponToProductlistRoutingModule } from './coupon-to-productlist-routing.module';
import { CouponToProductlistComponent } from './coupon-to-productlist.component';

@NgModule({
  declarations: [CouponToProductlistComponent],
  imports: [
    CommonModule,
    CouponToProductlistRoutingModule
  ]
})

export class CouponToProductlistModule { }
