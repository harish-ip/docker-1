import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenTenantNotificationsComponent } from './open-tenant-notifications.component';

const routes: Routes = [
  {
    path: '' ,component: OpenTenantNotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenTenantNotificationsRoutingModule { }
