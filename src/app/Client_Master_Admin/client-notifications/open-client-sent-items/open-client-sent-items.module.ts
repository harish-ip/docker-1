import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenClientSentItemsRoutingModule } from './open-client-sent-items-routing.module';
import { OpenClientSentItemsComponent } from './open-client-sent-items.component';

@NgModule({
  declarations: [OpenClientSentItemsComponent],
  imports: [
    CommonModule,
    OpenClientSentItemsRoutingModule
  ]
})
export class OpenClientSentItemsModule { }
