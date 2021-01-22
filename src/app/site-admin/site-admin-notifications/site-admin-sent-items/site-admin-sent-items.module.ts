import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteAdminSentItemsRoutingModule } from './site-admin-sent-items-routing.module';
import { SiteAdminSentItemsComponent } from './site-admin-sent-items.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';
import { NotificationFilterPipe } from './notification-filter.pipe';


@NgModule({
  declarations: [SiteAdminSentItemsComponent, NotificationFilterPipe],
  imports: [
    CommonModule,
    SiteAdminSentItemsRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class SiteAdminSentItemsModule { }
