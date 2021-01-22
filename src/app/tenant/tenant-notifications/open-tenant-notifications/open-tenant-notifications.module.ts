import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenTenantNotificationsRoutingModule } from './open-tenant-notifications-routing.module';
import { OpenTenantNotificationsComponent } from './open-tenant-notifications.component';

@NgModule({
  declarations: [OpenTenantNotificationsComponent],
  imports: [
    CommonModule,
    OpenTenantNotificationsRoutingModule
  ]
})
export class OpenTenantNotificationsModule { }
