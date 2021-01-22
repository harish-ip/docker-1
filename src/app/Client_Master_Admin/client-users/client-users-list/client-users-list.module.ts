import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientUsersListRoutingModule } from './client-users-list-routing.module';
import { ClientUsersListComponent } from './client-users-list.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';
import { FilterPipe } from './filter.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  declarations: [ClientUsersListComponent, FilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ClientUsersListRoutingModule,
    PaginationModule,
    Ng2OrderModule
  ]
})
export class ClientUsersListModule { }
