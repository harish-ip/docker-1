import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProductsComponent } from './new-products.component';

const routes: Routes = [
  { path: '', component: NewProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NewProductsRoutingModule { }
