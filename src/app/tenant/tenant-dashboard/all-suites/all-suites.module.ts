import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllSuitesRoutingModule } from './all-suites-routing.module';
import { AllSuitesComponent } from './all-suites.component';

@NgModule({
  declarations: [
    AllSuitesComponent,
  ],
  imports: [
    CommonModule,
    AllSuitesRoutingModule
  ]
})

export class AllSuitesModule { }
