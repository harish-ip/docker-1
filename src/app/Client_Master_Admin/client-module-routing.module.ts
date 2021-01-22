import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientModuleComponent } from './client-module.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';

const routes: Routes = [
  {
    path: '', component: ClientModuleComponent, children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: ClientDashboardComponent },
      { path: 'products', loadChildren: () => import('./client-products/client-products.module').then(m => m.ClientProductsModule) },
      { path: 'users', loadChildren: () => import('./client-users/client-users.module').then(m => m.ClientUsersModule) },
      { path: 'emails', loadChildren: () => import('./client-emails/client-emails.module').then(m => m.ClientEmailsModule) },
      { path: 'notifications', loadChildren: () => import('./client-notifications/client-notifications.module').then(m => m.ClientNotificationsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientModuleRoutingModule { }
