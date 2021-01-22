import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenantDashboardComponent } from './tenant-dashboard.component';

const routes: Routes = [
  {
    path: '', component: TenantDashboardComponent, children: [
      // { path: '', redirectTo: "subscribedProducts" },
      { path: 'newProducts', loadChildren: () => import('./new-products/new-products.module').then(m => m.NewProductsModule) },
      { path: 'trialProducts', loadChildren: () => import('./trial-products/trial-products.module').then(m => m.TrialProductsModule) },
      { path: 'subscribedProducts', loadChildren: () => import('./subscribed-products/subscribed-products.module').then(m => m.SubscribedProductsModule) },
      { path: 'allSuites', loadChildren: () => import('./all-suites/all-suites.module').then(m => m.AllSuitesModule) },
      { path: 'couponstoproducts', loadChildren: () => import('./coupons/coupons.module').then(m => m.CouponsModule) },
      { path: 'usercoupons', loadChildren: () => import('./usercoupons/usercoupons.module').then(m => m.UsercouponsModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TenantDashboardRoutingModule { }
