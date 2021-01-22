import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenantComponent } from './tenant.component';
import { SelectedurlComponent } from './selectedurl/selectedurl.component';

const routes: Routes = [
  {
    path: '', component: TenantComponent, children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: () => import('./tenant-dashboard/tenant-dashboard.module').then(m => m.TenantDashboardModule) },
      { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: 'notifications', loadChildren: () => import('./tenant-notifications/tenant-notifications.module').then(m => m.TenantNotificationsModule) }
    ]
  },
  { path: 'loadApp', component: SelectedurlComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TenantRoutingModule { }
