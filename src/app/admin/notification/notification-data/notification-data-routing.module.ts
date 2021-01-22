import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationDataComponent } from './notification-data.component';

const routes: Routes = [
  {path : '' ,component: NotificationDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationDataRoutingModule { }
