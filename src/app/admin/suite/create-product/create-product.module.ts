import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateProductRoutingModule } from './create-product-routing.module';
import { CreateProductComponent } from './create-product.component';
import { PriceModule } from 'src/app/share/module/share/price.module';
import { UpperCaseModule } from 'src/app/share/module/share/upper-case.module';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    CreateProductRoutingModule,
    PriceModule,
    UpperCaseModule
  ]
})
export class CreateProductModule { }
