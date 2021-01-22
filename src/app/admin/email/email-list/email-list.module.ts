import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';

import { EmailListRoutingModule } from './email-list-routing.module';
import { EmailListComponent } from './email-list.component';
import { TenantFilterPipe } from './tenant-filter.pipe';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';

@NgModule({
  declarations: [EmailListComponent,
    TenantFilterPipe],
  imports: [
    CommonModule,
    EmailListRoutingModule,
    FormsModule,
    Ng2OrderModule,
    ReactiveFormsModule,
    PaginationModule
  ]
})
export class EmailListModule { }
