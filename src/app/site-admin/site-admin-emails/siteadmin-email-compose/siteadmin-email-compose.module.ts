import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SiteadminEmailComposeRoutingModule } from './siteadmin-email-compose-routing.module';
import { SiteadminEmailComposeComponent } from './siteadmin-email-compose.component';

@NgModule({
  declarations: [SiteadminEmailComposeComponent],
  imports: [
    CommonModule,
    FormsModule,
    SiteadminEmailComposeRoutingModule
  ]
})
export class SiteadminEmailComposeModule { }
