import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenSiteAdminNotificationsComponent } from './open-site-admin-notifications.component';

const routes: Routes = [
  {
    path: '',component: OpenSiteAdminNotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenSiteAdminNotificationsRoutingModule { }
