import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSuiteComponent } from './create-suite.component';

const routes: Routes = [
  { path: '', component: CreateSuiteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CreateSuiteRoutingModule { }
