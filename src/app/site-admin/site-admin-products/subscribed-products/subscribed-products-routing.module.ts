import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscribedProductsComponent } from './subscribed-products.component';

const routes: Routes = [
  { path: '', component: SubscribedProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SubscribedProductsRoutingModule { }
