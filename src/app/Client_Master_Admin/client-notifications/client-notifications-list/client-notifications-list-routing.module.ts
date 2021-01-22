import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientNotificationsListComponent } from './client-notifications-list.component';

const routes: Routes = [
  {
    path : '',component: ClientNotificationsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientNotificationsListRoutingModule { }
