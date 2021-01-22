import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EditProductRoutingModule } from './edit-product-routing.module';
import { EditProductComponent } from './edit-product.component';
import { UpperCaseModule } from 'src/app/share/module/share/upper-case.module';
import { PriceModule } from 'src/app/share/module/share/price.module';

@NgModule({
  declarations: [EditProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    PriceModule,
    UpperCaseModule,
    EditProductRoutingModule
  ]
})
export class EditProductModule { }
