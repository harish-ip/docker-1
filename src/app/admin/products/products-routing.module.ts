import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';

const routes: Routes = [

  {
    path: '', component: ProductComponent,
    children: [
      { path: '', redirectTo: 'product-list', pathMatch: 'prefix' },
      { path: 'create-product', loadChildren: () => import('./create-product/create-product.module').then(m => m.CreateProductModule) },
      { path: 'edit-product', loadChildren: () => import('./edit-product/edit-product.module').then(m => m.EditProductModule) },
      { path: 'product-list', loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
