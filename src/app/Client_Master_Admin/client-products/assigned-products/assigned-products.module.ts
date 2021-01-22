import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignedProductsRoutingModule } from './assigned-products-routing.module';
import { AssignedProductsComponent } from './assigned-products.component';

@NgModule({
  declarations: [AssignedProductsComponent],
  imports: [
    CommonModule,
    AssignedProductsRoutingModule
  ]
})
export class AssignedProductsModule { }
