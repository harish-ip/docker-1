import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientNotificationsListRoutingModule } from './client-notifications-list-routing.module';
import { ClientNotificationsListComponent } from './client-notifications-list.component';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';
import { NotificationFilterPipe } from './notification-filter.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientNotificationsListComponent,NotificationFilterPipe],
  imports: [
    CommonModule,
    ClientNotificationsListRoutingModule,
    PaginationModule,
    Ng2OrderModule,
    FormsModule
  ]
})
export class ClientNotificationsListModule { }
