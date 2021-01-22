import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SiteadminUsersListRoutingModule } from './siteadmin-users-list-routing.module';
import { SiteadminUsersListComponent } from './siteadmin-users-list.component';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';
import { FilterPipe } from './filter.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  declarations: [SiteadminUsersListComponent, FilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    SiteadminUsersListRoutingModule,
    PaginationModule,
    Ng2OrderModule
  ]
})
export class SiteadminUsersListModule { }
