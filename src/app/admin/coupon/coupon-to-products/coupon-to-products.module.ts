import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CouponToProductsRoutingModule } from './coupon-to-products-routing.module';
import { CouponToProductsComponent } from './coupon-to-products.component';

@NgModule({
  declarations: [CouponToProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    CouponToProductsRoutingModule
  ]
})
export class CouponToProductsModule { }
