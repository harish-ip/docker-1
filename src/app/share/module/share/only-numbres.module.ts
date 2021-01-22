import { NgModule } from '@angular/core';
import { NumbersOnlyDirective } from '../../directives/numbers-only.directive';

@NgModule({
  declarations: [NumbersOnlyDirective],
  exports: [NumbersOnlyDirective]
})
export class OnlyNumbresModule { }

