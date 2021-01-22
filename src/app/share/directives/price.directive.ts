import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrice]'
})
export class PriceDirective {

  // /^[1-9]\d*\.?\d{0,2}$/g    working

  // /^(\d{1,7})(\.\d{1,2})?$/g   decimal before 7 digits and after 2 digits

  // \d{0,2}(\.\d{1,2})?    decimal before 2 digits and after 2 digits

  private regex: RegExp = new RegExp(/^[1-9]\d*\.?\d{0,2}$/g);

  private specialKeys: Array<string> = ['Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) { }
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
  @HostListener('keydown', ['$event'])

  onKeyDown(event: KeyboardEvent) {

    console.log(event.key);

    if (event.keyCode == 8 || event.keyCode == 9) {
      return true;
    }
    else if (this.specialKeys.indexOf(event.key) !== -1) {
      return false;
    }

    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
