import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuiteListComponent } from './suite-list.component';

const routes: Routes = [
  { path: '', component: SuiteListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SuiteListRoutingModule { }
