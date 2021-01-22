import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';

import { SiteadminEmailsListRoutingModule } from './siteadmin-emails-list-routing.module';
import { SiteadminEmailsListComponent } from './siteadmin-emails-list.component';
import { TenantFilterPipe } from './tenant-filter.pipe';

@NgModule({
  declarations: [SiteadminEmailsListComponent, TenantFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    PaginationModule,
    SiteadminEmailsListRoutingModule,
  ]
})
export class SiteadminEmailsListModule { }
