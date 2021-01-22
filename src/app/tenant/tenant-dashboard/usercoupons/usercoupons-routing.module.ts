import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsercouponsComponent } from './usercoupons.component';

const routes: Routes = [
  { path: '', component: UsercouponsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsercouponsRoutingModule { }
