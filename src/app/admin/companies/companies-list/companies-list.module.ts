import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CompaniesListRoutingModule } from './companies-list-routing.module';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { PaginationModule } from 'src/app/share/module/share/pagination.module';
import { CompaniesListComponent } from './companies-list.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [CompaniesListComponent,
    FilterPipe],
  imports: [
    CommonModule,
    CompaniesListRoutingModule,
    FormsModule,
    Ng2OrderModule,
    PaginationModule
  ]
})
export class CompaniesListModule { }
