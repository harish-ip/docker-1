import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appSelectRequired]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SelectRequiredDirective,
    multi: true
  }]
})
export class SelectRequiredDirective {

  @Input('appSelectRequiredValidator') defaultValue: string;
  validate(control: AbstractControl): { [key: string]: any } | null {
    return control.value === this.defaultValue ? { 'defaultSelected': true } : null;
  }

}
