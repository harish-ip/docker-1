import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteadminEmailsListComponent } from './siteadmin-emails-list.component';

const routes: Routes = [
  {
    path: '', component: SiteadminEmailsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteadminEmailsListRoutingModule { }
