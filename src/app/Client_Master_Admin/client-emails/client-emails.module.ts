import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientEmailsRoutingModule } from './client-emails-routing.module';
import { ClientEmailsComponent } from './client-emails.component';

@NgModule({
  declarations: [ClientEmailsComponent],
  imports: [
    CommonModule,
    ClientEmailsRoutingModule
  ]
})
export class ClientEmailsModule { }
