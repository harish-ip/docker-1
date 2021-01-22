import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenClientNotificationsComponent } from './open-client-notifications.component';

const routes: Routes = [
  {
    path: '' , component :OpenClientNotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenClientNotificationsRoutingModule { }
