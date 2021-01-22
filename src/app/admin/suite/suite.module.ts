import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuiteRoutingModule } from './suite-routing.module';
import { SuiteComponent } from './suite.component';

@NgModule({
  declarations: [
    SuiteComponent
  ],
  imports: [
    CommonModule,
    SuiteRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})

export class SuiteModule { }
