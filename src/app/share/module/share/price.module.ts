import { NgModule } from '@angular/core';
import { PriceDirective } from '../../directives/price.directive';

@NgModule({
  declarations: [PriceDirective],
  exports: [PriceDirective]
})
export class PriceModule { }
