import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenNotificationRoutingModule } from './open-notification-routing.module';
import { OpenNotificationComponent } from './open-notification.component';

@NgModule({
  declarations: [OpenNotificationComponent],
  imports: [
    CommonModule,
    OpenNotificationRoutingModule
  ]
})
export class OpenNotificationModule { }
