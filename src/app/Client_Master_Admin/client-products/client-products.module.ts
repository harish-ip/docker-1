import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientProductsRoutingModule } from './client-products-routing.module';
import { ClientProductsComponent } from './client-products.component';


@NgModule({
  declarations: [ClientProductsComponent],
  imports: [
    CommonModule,
    ClientProductsRoutingModule
  ]
})
export class ClientProductsModule { }
