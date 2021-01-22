import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientNotificationsRoutingModule } from './client-notifications-routing.module';
import { ClientNotificationsComponent } from './client-notifications.component';



@NgModule({
  declarations: [ClientNotificationsComponent],
  imports: [
    CommonModule,
    ClientNotificationsRoutingModule
  ]
})
export class ClientNotificationsModule { }
