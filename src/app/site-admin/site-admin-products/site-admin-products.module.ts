import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SiteADminProductsRoutingModule } from './site-admin-products-routing.module';
import { SiteAdminProductsComponent } from './site-admin-products.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';

@NgModule({
  declarations: [SiteAdminProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SiteADminProductsRoutingModule
  ]
})
export class SiteADminProductsModule { }
