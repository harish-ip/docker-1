import { NgModule } from '@angular/core';
import { CouponCodeDirective } from '../../directives/coupon-code.directive';

@NgModule({
  declarations: [CouponCodeDirective],
  exports: [CouponCodeDirective]
})
export class CouponcodeModule { }
