import { NgModule } from '@angular/core';
import { ConfirmPasswordDirective } from '../../directives/confirm-password.directive';

@NgModule({
  declarations: [ConfirmPasswordDirective],
  exports: [ConfirmPasswordDirective]
})
export class ConPwdModule { }
