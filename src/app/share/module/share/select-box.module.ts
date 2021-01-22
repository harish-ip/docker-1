import { NgModule } from '@angular/core';
import { SelectRequiredDirective } from '../../directives/select-required.directive';

@NgModule({
  declarations: [SelectRequiredDirective],
  exports:[SelectRequiredDirective]
})
export class SelectBoxModule { }
