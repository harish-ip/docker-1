import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentItemsRoutingModule } from './sent-items-routing.module';
import { SentItemsComponent } from './sent-items.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';
import { NotificationFilterPipe } from './notification-filter.pipe';

@NgModule({
  declarations: [SentItemsComponent, NotificationFilterPipe],
  imports: [
    CommonModule,
    SentItemsRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class SentItemsModule { }
