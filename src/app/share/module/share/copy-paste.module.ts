import { NgModule } from '@angular/core';
import { BlockCopyPasteDirective } from '../../directives/block-copy-paste.directive';

@NgModule({
  declarations: [BlockCopyPasteDirective],
  exports: [BlockCopyPasteDirective]
})
export class CopyPasteModule { }
