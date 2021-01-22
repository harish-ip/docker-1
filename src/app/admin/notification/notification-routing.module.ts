import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationComponent } from './notification.component';

const routes: Routes = [
  {
    path: '', component: NotificationComponent,
    children: [
      { path: '', redirectTo: 'notification-List', pathMatch: 'prefix' },
      { path: 'notification-List', loadChildren: () => import('./notification-data/notification-data.module').then(m => m.NotificationDataModule) },
      { path: 'open-notification', loadChildren: () => import('./open-notification/open-notification.module').then(m => m.OpenNotificationModule) },
      { path: 'sent-email', loadChildren: () => import('./sent-items/sent-items.module').then(m => m.SentItemsModule) },
      { path: 'open-sent-items',loadChildren: () => import('./open-sent-items/open-sent-items.module').then(m => m.OpenSentItemsModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
