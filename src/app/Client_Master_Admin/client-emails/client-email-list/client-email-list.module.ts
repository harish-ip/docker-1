import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';
import { Ng2OrderModule } from 'ng2-order-pipe';

import { ClientEmailListRoutingModule } from './client-email-list-routing.module';
import { ClientEmailListComponent } from './client-email-list.component';
import { TenantFilterPipe } from './tenant-filter.pipe';

@NgModule({
  declarations: [ClientEmailListComponent, TenantFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    PaginationModule,
    ClientEmailListRoutingModule
  ]
})
export class ClientEmailListModule { }
