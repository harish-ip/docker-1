import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssignedProductsRoutingModule } from './assigned-products-routing.module';
import { AssignedProductsComponent } from './assigned-products.component';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';

@NgModule({
  declarations: [AssignedProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    AssignedProductsRoutingModule,
    PaginationModule
  ]
})
export class AssignedProductsModule { }
