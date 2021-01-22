import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateSuiteRoutingModule } from './create-suite-routing.module';
import { CreateSuiteComponent } from './create-suite.component';

@NgModule({
  declarations: [
    CreateSuiteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CreateSuiteRoutingModule
  ]
})

export class CreateSuiteModule { }
