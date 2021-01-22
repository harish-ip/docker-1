import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignedProductsComponent } from './assigned-products.component';

const routes: Routes = [
  { path: '', component: AssignedProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignedProductsRoutingModule { }
