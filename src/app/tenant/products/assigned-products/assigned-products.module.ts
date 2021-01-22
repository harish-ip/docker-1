import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssignedProductsRoutingModule } from './assigned-products-routing.module';
import { AssignedProductsComponent } from './assigned-products.component';

@NgModule({
  declarations: [AssignedProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    AssignedProductsRoutingModule
  ]
})
export class AssignedProductsModule { }
