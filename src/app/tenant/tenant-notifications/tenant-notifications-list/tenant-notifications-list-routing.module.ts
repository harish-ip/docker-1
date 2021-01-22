import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantNotificationsListComponent } from './tenant-notifications-list.component';

const routes: Routes = [
  {
    path: '', component: TenantNotificationsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantNotificationsListRoutingModule { }
