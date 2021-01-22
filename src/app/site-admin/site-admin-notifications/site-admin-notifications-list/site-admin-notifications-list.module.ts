import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteAdminNotificationsListRoutingModule } from './site-admin-notifications-list-routing.module';
import { SiteAdminNotificationsListComponent } from './site-admin-notifications-list.component';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';
import { NotificationFilterPipe } from './notification-filter.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SiteAdminNotificationsListComponent, NotificationFilterPipe],
  imports: [
    CommonModule,
    SiteAdminNotificationsListRoutingModule,
    PaginationModule,
    Ng2OrderModule,
    FormsModule
  ]
})
export class SiteAdminNotificationsListModule { }
