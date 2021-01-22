import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenSentItemsRoutingModule } from './open-sent-items-routing.module';
import { OpenSentItemsComponent } from './open-sent-items.component';

@NgModule({
  declarations: [OpenSentItemsComponent],
  imports: [
    CommonModule,
    OpenSentItemsRoutingModule
  ]
})
export class OpenSentItemsModule { }
