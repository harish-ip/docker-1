import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MailComposeRoutingModule } from './mail-compose-routing.module';
import { MailComposeComponent } from './mail-compose.component';

@NgModule({
  declarations: [MailComposeComponent],
  imports: [
    CommonModule,
    FormsModule,
    MailComposeRoutingModule
  ]
})
export class MailComposeModule { }
