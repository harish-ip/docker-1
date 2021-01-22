import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteAdminUsersRoutingModule } from './site-admin-users-routing.module';
import { SiteAdminUsersComponent } from './site-admin-users.component';

@NgModule({
  declarations: [SiteAdminUsersComponent],
  imports: [
    CommonModule,
    SiteAdminUsersRoutingModule
  ]
})
export class SiteAdminUsersModule { }
