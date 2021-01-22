import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllSuitesComponent } from './all-suites.component';

const routes: Routes = [
  { path: '', component: AllSuitesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AllSuitesRoutingModule { }
