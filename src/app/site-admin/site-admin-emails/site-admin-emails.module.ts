import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteAdminEmailsRoutingModule } from './site-admin-emails-routing.module';
import { SiteAdminEmailsComponent } from './site-admin-emails.component';

@NgModule({
  declarations: [SiteAdminEmailsComponent],
  imports: [
    CommonModule,
    SiteAdminEmailsRoutingModule
  ]
})
export class SiteAdminEmailsModule { }
