import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateCouponComponent } from './generate-coupon.component';

const routes: Routes = [
  { path: '', component: GenerateCouponComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateCouponRoutingModule { }
