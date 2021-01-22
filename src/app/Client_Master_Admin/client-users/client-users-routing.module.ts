import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientUsersComponent } from './client-users.component';

const routes: Routes = [
  {
    path: '', component: ClientUsersComponent,
    children: [
      { path: '', redirectTo: 'client-user-list', pathMatch: 'prefix' },
      { path: 'client-user-list', loadChildren: () => import('./client-users-list/client-users-list.module').then(m => m.ClientUsersListModule) },
      { path: 'create-client-user', loadChildren: () => import('./create-client-user/create-client-user.module').then(m => m.CreateClientUserModule) },
      { path: 'edit-client-user', loadChildren: () => import('./edit-client-user/edit-client-user.module').then(m => m.EditClientUserModule) }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientUsersRoutingModule { }
