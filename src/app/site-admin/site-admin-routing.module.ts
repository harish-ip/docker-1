import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteAdminComponent } from './site-admin.component';
import { SiteADminDashboardComponent } from './site-admin-dashboard/site-admin-dashboard.component';

const routes: Routes = [
  {
    path: '', component: SiteAdminComponent, children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: SiteADminDashboardComponent },
      { path: 'products', loadChildren: () => import('./site-admin-products/site-admin-products.module').then(m => m.SiteADminProductsModule) },
      { path: 'users', loadChildren: () => import('./site-admin-users/site-admin-users.module').then(m => m.SiteAdminUsersModule) },
      { path: 'emails', loadChildren: () => import('./site-admin-emails/site-admin-emails.module').then(m => m.SiteAdminEmailsModule) },
      { path: 'notifications', loadChildren: () => import('./site-admin-notifications/site-admin-notifications.module').then(m => m.SiteAdminNotificationsModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteAdminRoutingModule { }
