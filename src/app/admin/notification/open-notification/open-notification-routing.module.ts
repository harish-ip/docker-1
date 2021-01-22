import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenNotificationComponent } from './open-notification.component';

const routes: Routes = [
  { path: '', component: OpenNotificationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenNotificationRoutingModule { }
