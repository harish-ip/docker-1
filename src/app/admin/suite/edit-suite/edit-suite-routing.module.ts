import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSuiteComponent } from './edit-suite.component';

const routes: Routes = [
  { path: '', component: EditSuiteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EditSuiteRoutingModule { }
