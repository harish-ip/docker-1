import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteadminUsersListComponent } from './siteadmin-users-list.component';

const routes: Routes = [
  {
    path: '', component: SiteadminUsersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteadminUsersListRoutingModule { }
