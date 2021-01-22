import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenClientNotificationsRoutingModule } from './open-client-notifications-routing.module';
import { OpenClientNotificationsComponent } from './open-client-notifications.component';

@NgModule({
  declarations: [OpenClientNotificationsComponent],
  imports: [
    CommonModule,
    OpenClientNotificationsRoutingModule
  ]
})
export class OpenClientNotificationsModule { }
