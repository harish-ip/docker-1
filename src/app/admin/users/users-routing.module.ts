import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: '', redirectTo: 'users-list', pathMatch: 'prefix' },
      { path: 'create-user', loadChildren: () => import('./create-user/create-user.module').then(m => m.CreateUserModule) },
      { path: 'users-list', loadChildren: () => import('./users-list/users-list.module').then(m => m.UsersListModule) },
      { path: 'edit-user', loadChildren: () => import('./edit-user/edit-user.module').then(m => m.EditUserModule) },
      { path: 'extend-subscription', loadChildren: () => import('./extend-subscription/extend-subscription.module').then(m => m.ExtendSubscriptionModule) }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
