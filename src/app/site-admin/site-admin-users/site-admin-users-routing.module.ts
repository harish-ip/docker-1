import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteAdminUsersComponent } from './site-admin-users.component';

const routes: Routes = [
  {
    path: '', component: SiteAdminUsersComponent,
    children: [
      { path: '', redirectTo: 'siteadmin-user-list', pathMatch: 'prefix' },
      { path: 'siteadmin-user-list', loadChildren: () => import('./siteadmin-users-list/siteadmin-users-list.module').then(m => m.SiteadminUsersListModule) },
      { path: 'create-siteadmin-user', loadChildren: () => import('./create-siteadmin-user/create-siteadmin-user.module').then(m => m.CreateSiteadminUserModule) },
      { path: 'edit-siteadmin-user', loadChildren: () => import('./edit-siteadmin-user/edit-siteadmin-user.module').then(m => m.EditSiteadminUserModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteAdminUsersRoutingModule { }
