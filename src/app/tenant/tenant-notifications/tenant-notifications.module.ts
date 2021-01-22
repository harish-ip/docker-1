import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantNotificationsRoutingModule } from './tenant-notifications-routing.module';
import { TenantNotificationsComponent } from './tenant-notifications.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TenantNotificationsComponent],
  imports: [
    CommonModule,
    FormsModule,
    TenantNotificationsRoutingModule
  ]
})
export class TenantNotificationsModule { }
