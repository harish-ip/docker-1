import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCouponCode]'
})
export class CouponCodeDirective {

  // private regex: RegExp = new RegExp(/^[a-zA-Z0-9-]*$/);
  // private regex: RegExp = new RegExp(/^[a-zA-Z0-9]*\-?\d{0,4}-?\d{0,4}$/);
  private regex: RegExp = new RegExp(/^[a-zA-Z0-9-]*$/);
  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])

  onKeyDown(event: KeyboardEvent) {
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
