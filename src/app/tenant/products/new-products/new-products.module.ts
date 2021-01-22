import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewProductsRoutingModule } from './new-products-routing.module';
import { NewProductsComponent } from './new-products.component';
import { CouponcodeModule } from 'src/app/share/module/share/couponcode.module';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';

@NgModule({
  declarations: [NewProductsComponent],
  imports: [
    CommonModule,
    NewProductsRoutingModule,
    CouponcodeModule,
    PaginationModule
  ]
})

export class NewProductsModule { }
