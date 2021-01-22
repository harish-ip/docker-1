import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';

import { GenerateCouponRoutingModule } from './generate-coupon-routing.module';
import { GenerateCouponComponent } from './generate-coupon.component';
import { DatepickerShareModule } from 'src/app/share/service/datepickerShare/datepickerShare.module';
import { PriceModule } from 'src/app/share/module/share/price.module';

@NgModule({
  declarations: [GenerateCouponComponent],
  imports: [
    CommonModule,
    GenerateCouponRoutingModule,
    FormsModule,
    NgDatepickerModule,
    DatepickerShareModule,
    PriceModule
  ]
})
export class GenerateCouponModule { }
