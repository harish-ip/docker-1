import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersListRoutingModule } from './users-list-routing.module';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';
import { UsersListComponent } from './users-list.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [UsersListComponent,
    FilterPipe],
  imports: [
    CommonModule,
    UsersListRoutingModule,
    FormsModule,
    Ng2OrderModule,
    PaginationModule
  ]
})
export class UsersListModule { }
