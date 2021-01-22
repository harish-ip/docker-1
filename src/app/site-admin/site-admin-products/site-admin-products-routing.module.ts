import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteAdminProductsComponent } from './site-admin-products.component';

const routes: Routes = [
  {
    path: '', component: SiteAdminProductsComponent,
    children: [
      { path: '', redirectTo: 'product-list', pathMatch: 'prefix' },
      { path: 'product-list', loadChildren: () => import('./products-list/products-list.module').then(m => m.ProductsListModule) },
      { path: 'trial-products', loadChildren: () => import('./trial-products/trial-products.module').then(m => m.TrialProductsModule) },
      { path: 'subscribed-products', loadChildren: () => import('./subscribed-products/subscribed-products.module').then(m => m.SubscribedProductsModule) },
      { path: 'assigned-products', loadChildren: () => import('./assigned-products/assigned-products.module').then(m => m.AssignedProductsModule) },
      
    ]
  },
  { path: 'products-details', loadChildren:() => import('./products-details/products-details.module').then(m => m.ProductsDetailsModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteADminProductsRoutingModule { }
