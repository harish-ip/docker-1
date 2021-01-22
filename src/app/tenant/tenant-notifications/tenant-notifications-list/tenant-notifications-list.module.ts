import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantNotificationsListRoutingModule } from './tenant-notifications-list-routing.module';
import { TenantNotificationsListComponent } from './tenant-notifications-list.component';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';
import { NotificationFilterPipe } from './notification-filter.pipe';
import { FormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  declarations: [TenantNotificationsListComponent, NotificationFilterPipe],
  imports: [
    CommonModule,
    TenantNotificationsListRoutingModule,
    PaginationModule,
    Ng2OrderModule,
    FormsModule
  ]
})
export class TenantNotificationsListModule { }
