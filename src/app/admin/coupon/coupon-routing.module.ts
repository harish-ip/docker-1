import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponComponent } from './coupon.component';

const routes: Routes = [
  {
    path: '', component: CouponComponent,
    children: [
      { path: '', redirectTo: 'coupons-list', pathMatch: 'prefix' },
      { path: 'coupons-list', loadChildren: () => import('./coupon-list/coupon-list.module').then(m => m.CouponListModule) },
      { path: 'generate-coupons', loadChildren: () => import('./generate-coupon/generate-coupon.module').then(m => m.GenerateCouponModule) },
      { path: 'coupon-to-products', loadChildren: () => import('./coupon-to-products/coupon-to-products.module').then(m => m.CouponToProductsModule) },
      { path: 'coupon-to-tenant', loadChildren: () => import('./coupon-to-tenant/coupon-to-tenant.module').then(m => m.CouponToTenantModule) },
      { path: 'coupon-to-tenantlist', loadChildren: () => import('./coupon-to-tenantlist/coupon-to-tenantlist.module').then(m => m.CouponToTenantlistModule) },
      { path: 'coupon-to-productlist', loadChildren: () => import('./coupon-to-productlist/coupon-to-productlist.module').then(m => m.CouponToProductlistModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CouponRoutingModule { }
