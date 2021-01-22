import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientEmailComposeRoutingModule } from './client-email-compose-routing.module';
import { ClientEmailComposeComponent } from './client-email-compose.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientEmailComposeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClientEmailComposeRoutingModule
  ]
})
export class ClientEmailComposeModule { }
