import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSentitemsRoutingModule } from './client-sentitems-routing.module';
import { ClientSentitemsComponent } from './client-sentitems.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';
import { NotificationFilterPipe } from './notification-filter.pipe';


@NgModule({
  declarations: [ClientSentitemsComponent, NotificationFilterPipe],
  imports: [
    CommonModule,
    ClientSentitemsRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class ClientSentitemsModule { }
