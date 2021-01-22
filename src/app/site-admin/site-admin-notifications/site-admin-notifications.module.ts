import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteAdminNotificationsRoutingModule } from './site-admin-notifications-routing.module';
import { SiteAdminNotificationsComponent } from './site-admin-notifications.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [SiteAdminNotificationsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SiteAdminNotificationsRoutingModule
  ]
})
export class SiteAdminNotificationsModule { }
