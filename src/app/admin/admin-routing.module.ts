import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent ,},
      { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: 'suites', loadChildren: () => import('./suite/suite.module').then(m => m.SuiteModule) },
      { path: 'coupons', loadChildren: () => import('./coupon/coupon.module').then(m => m.CouponModule) },
      { path: 'refund', loadChildren: () => import('./refund/refund.module').then(m => m.RefundModule) },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
	  { path: 'companies', loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule) },
      { path: 'emails', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
      { path: 'notifications', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
