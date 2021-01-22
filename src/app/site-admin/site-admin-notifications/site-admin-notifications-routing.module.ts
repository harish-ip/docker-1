import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteAdminNotificationsComponent } from './site-admin-notifications.component';

const routes: Routes = [
  {
    path: '', component: SiteAdminNotificationsComponent,
    children: [
      { path: '', redirectTo: 'site-admin-notifications-list', pathMatch: 'prefix' },
      { path: 'site-admin-notifications-list', loadChildren: () => import('./site-admin-notifications-list/site-admin-notifications-list.module').then(m => m.SiteAdminNotificationsListModule) },
      { path: 'open-site-admin-notifications', loadChildren: () => import('./open-site-admin-notifications/open-site-admin-notifications.module').then(m => m.OpenSiteAdminNotificationsModule) },
      { path: 'site-admin-sent-items', loadChildren: () => import('./site-admin-sent-items/site-admin-sent-items.module').then(m => m.SiteAdminSentItemsModule) },
      { path: 'open-site-admin-sent-items', loadChildren: () => import('./open-site-admin-sent-items/open-site-admin-sent-items.module').then(m => m.OpenSiteAdminSentItemsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteAdminNotificationsRoutingModule { }


