import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribedProductsRoutingModule } from './subscribed-products-routing.module';
import { SubscribedProductsComponent } from './subscribed-products.component';

@NgModule({
  declarations: [
    SubscribedProductsComponent
  ],
  imports: [
    CommonModule,
    SubscribedProductsRoutingModule
  ]
})

export class SubscribedProductsModule { }
