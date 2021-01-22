import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExtendSubscriptionRoutingModule } from './extend-subscription-routing.module';
import { ExtendSubscriptionComponent } from './extend-subscription.component';
import { DatepickerShareModule } from 'src/app/share/service/datepickerShare/datepickerShare.module';

@NgModule({
  declarations: [ExtendSubscriptionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ExtendSubscriptionRoutingModule,
    DatepickerShareModule
  ]
})
export class ExtendSubscriptionModule { }
