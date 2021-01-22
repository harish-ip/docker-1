import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribedProductsRoutingModule } from './subscribed-products-routing.module';
import { SubscribedProductsComponent } from './subscribed-products.component';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';

@NgModule({
  declarations: [
    SubscribedProductsComponent
  ],
  imports: [
    CommonModule,
    SubscribedProductsRoutingModule,
    PaginationModule
  ]
})

export class SubscribedProductsModule { }
