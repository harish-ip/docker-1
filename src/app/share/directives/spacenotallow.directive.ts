import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSpacenotallow]'
})

export class SpacenotallowDirective {

  constructor(private el: ElementRef) { }

  private regex: RegExp = new RegExp(/^[a-zA-z0-9.@!#$%^&*()_+{}]+([\s][a-zA-Z0-9.@,]+)*$/);

  @HostListener('keydown', ['$event'])

  onKeyDown(event: KeyboardEvent) {
    // console.log(event);

    let current: string = this.el.nativeElement.value;

    // console.log(current);

    let next: string = current.concat(event.key);

    // console.log(next);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
