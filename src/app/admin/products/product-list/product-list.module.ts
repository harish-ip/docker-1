import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { ProductPipe } from './product.pipe';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';

@NgModule({
  declarations: [ProductListComponent, ProductPipe],
  imports: [
    CommonModule,
    FormsModule,
    Ng2OrderModule,
    ProductListRoutingModule,
    PaginationModule
  ]
})
export class ProductListModule { }
