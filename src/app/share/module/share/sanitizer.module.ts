import { NgModule } from '@angular/core';
import { SanitizerPipe } from '../../directives/sanitizer.pipe';

@NgModule({
  declarations:[SanitizerPipe],
  exports:[SanitizerPipe]
})
export class SanitizerModule { }
