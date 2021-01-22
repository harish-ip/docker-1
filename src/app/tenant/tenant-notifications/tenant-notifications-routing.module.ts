import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantNotificationsComponent } from './tenant-notifications.component';

const routes: Routes = [
  {
    path: '', component: TenantNotificationsComponent,
    children: [
      { path: '', redirectTo: 'tenant-notifications-list', pathMatch: 'prefix' },
      { path: 'tenant-notifications-list', loadChildren: () => import('./tenant-notifications-list/tenant-notifications-list.module').then(m => m.TenantNotificationsListModule) },
      { path: 'open-tenant-notifications' , loadChildren: () => import('./open-tenant-notifications/open-tenant-notifications.module').then(m => m.OpenTenantNotificationsModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantNotificationsRoutingModule { }
