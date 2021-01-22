import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuiteListRoutingModule } from './suite-list-routing.module';
import { SuiteListComponent } from './suite-list.component';

@NgModule({
  declarations: [
    SuiteListComponent
  ],
  imports: [
    CommonModule,
    SuiteListRoutingModule
  ]
})

export class SuiteListModule { }
