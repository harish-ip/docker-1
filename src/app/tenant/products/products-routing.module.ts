import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent,

    children: [
      { path: '', redirectTo: 'new-products', pathMatch: 'perfix' },
      { path: 'new-products', loadChildren: () => import('./new-products/new-products.module').then(m => m.NewProductsModule) },
      { path: 'trial-products', loadChildren: () => import('./trial-products/trial-products.module').then(m => m.TrialProductsModule) },
      { path: 'subscribed-products', loadChildren: () => import('./subscribed-products/subscribed-products.module').then(m => m.SubscribedProductsModule) },
      { path: 'assigned-products', loadChildren: () => import('./assigned-products/assigned-products.module').then(m => m.AssignedProductsModule) },
      // { path: 'productdetail', loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailModule) },
    ]

  },
  { path: 'productdetail', loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailModule) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
