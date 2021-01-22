import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationDataRoutingModule } from './notification-data-routing.module';
import { NotificationDataComponent } from './notification-data.component';
import { FormsModule } from '@angular/forms';
import { NotificationFilterPipe } from './notification-filter.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';

@NgModule({
  declarations: [NotificationDataComponent, NotificationFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    NotificationDataRoutingModule,
    PaginationModule,
    Ng2OrderModule
  ]
})
export class NotificationDataModule { }
