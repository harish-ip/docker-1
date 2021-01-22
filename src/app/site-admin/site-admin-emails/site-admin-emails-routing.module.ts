import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteAdminEmailsComponent } from './site-admin-emails.component';

const routes: Routes = [
  {
    path: '', component: SiteAdminEmailsComponent,
    children: [
      { path: '', redirectTo: 'siteadmin-email-list', pathMatch: 'prefix' },
      { path: 'siteadmin-email-list', loadChildren: () => import('./siteadmin-emails-list/siteadmin-emails-list.module').then(m => m.SiteadminEmailsListModule) },
      { path: 'siteadmin-email-compose', loadChildren: () => import('./siteadmin-email-compose/siteadmin-email-compose.module').then(m => m.SiteadminEmailComposeModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteAdminEmailsRoutingModule { }
