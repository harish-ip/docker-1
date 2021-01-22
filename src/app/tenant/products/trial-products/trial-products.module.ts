import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrialProductsRoutingModule } from './trial-products-routing.module';
import { TrialProductsComponent } from './trial-products.component';
import { CouponcodeModule } from 'src/app/share/module/share/couponcode.module';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';

@NgModule({
  declarations: [
    TrialProductsComponent,
  ],
  imports: [
    CommonModule,
    TrialProductsRoutingModule,
    CouponcodeModule,
    PaginationModule
  ]
})

export class TrialProductsModule { }
