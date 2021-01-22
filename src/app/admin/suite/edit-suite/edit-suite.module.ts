import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EditSuiteRoutingModule } from './edit-suite-routing.module';
import { EditSuiteComponent } from './edit-suite.component';

@NgModule({
  declarations: [
    EditSuiteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditSuiteRoutingModule
  ]
})

export class EditSuiteModule { }
