import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenSiteAdminNotificationsRoutingModule } from './open-site-admin-notifications-routing.module';
import { OpenSiteAdminNotificationsComponent } from './open-site-admin-notifications.component';

@NgModule({
  declarations: [OpenSiteAdminNotificationsComponent],
  imports: [
    CommonModule,
    OpenSiteAdminNotificationsRoutingModule
  ]
})
export class OpenSiteAdminNotificationsModule { }
