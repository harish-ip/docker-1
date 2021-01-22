import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';
import { DatepickerShareModule } from 'src/app/share/service/datepickerShare/datepickerShare.module';


import { CouponListRoutingModule } from './coupon-list-routing.module';
import { CouponListComponent } from './coupon-list.component';
import { PriceModule } from 'src/app/share/module/share/price.module';

@NgModule({
  declarations: [CouponListComponent],
  imports: [
    CommonModule,
    FormsModule,
    CouponListRoutingModule,
    NgDatepickerModule,
    PriceModule,
    DatepickerShareModule
  ]
})
export class CouponListModule { }
