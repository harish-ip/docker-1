import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientUsersRoutingModule } from './client-users-routing.module';
import { ClientUsersComponent } from './client-users.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClientUsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClientUsersRoutingModule
  ]
})
export class ClientUsersModule { }
