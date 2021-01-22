import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtendSubscriptionComponent } from './extend-subscription.component';

const routes: Routes = [
  { path: '', component: ExtendSubscriptionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtendSubscriptionRoutingModule { }
