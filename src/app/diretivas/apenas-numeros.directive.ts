import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appApenasNumeros]',
  standalone: true
})
export class ApenasNumerosDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
