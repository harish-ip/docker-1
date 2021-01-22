import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientUsersListComponent } from './client-users-list.component';

const routes: Routes = [
  {
    path: '', component: ClientUsersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientUsersListRoutingModule { }
