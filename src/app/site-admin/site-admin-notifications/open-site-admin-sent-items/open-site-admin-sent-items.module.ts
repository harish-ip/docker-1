import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenSiteAdminSentItemsRoutingModule } from './open-site-admin-sent-items-routing.module';
import { OpenSiteAdminSentItemsComponent } from './open-site-admin-sent-items.component';

@NgModule({
  declarations: [OpenSiteAdminSentItemsComponent],
  imports: [
    CommonModule,
    OpenSiteAdminSentItemsRoutingModule
  ]
})
export class OpenSiteAdminSentItemsModule { }
