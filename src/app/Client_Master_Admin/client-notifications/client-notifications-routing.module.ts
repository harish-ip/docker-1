import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientNotificationsComponent } from './client-notifications.component';

const routes: Routes = [
  {
    path: '', component: ClientNotificationsComponent,
    children: [
      { path: '', redirectTo: 'client-notification-list', pathMatch: 'prefix' },
      { path: 'client-notification-list', loadChildren: () => import('./client-notifications-list/client-notifications-list.module').then(m => m.ClientNotificationsListModule) },
      { path: 'open-client-notification', loadChildren: () => import('./open-client-notifications/open-client-notifications.module').then(m => m.OpenClientNotificationsModule) },
      { path: 'client-sent-items', loadChildren: () => import('./client-sentitems/client-sentitems.module').then(m => m.ClientSentitemsModule) },
      { path: 'open-client-sent-items', loadChildren: () => import('./open-client-sent-items/open-client-sent-items.module').then(m => m.OpenClientSentItemsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientNotificationsRoutingModule { }
