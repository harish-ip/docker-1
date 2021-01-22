import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsercouponsRoutingModule } from './usercoupons-routing.module';
import { UsercouponsComponent } from './usercoupons.component';

@NgModule({
  declarations: [UsercouponsComponent],
  imports: [
    CommonModule,
    UsercouponsRoutingModule
  ]
})

export class UsercouponsModule { }
