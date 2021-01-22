import { NgModule } from '@angular/core';
import { UpperCaseDirective } from '../../directives/upper-case.directive';

@NgModule({
  declarations: [UpperCaseDirective],
  exports: [UpperCaseDirective]
})
export class UpperCaseModule { }
