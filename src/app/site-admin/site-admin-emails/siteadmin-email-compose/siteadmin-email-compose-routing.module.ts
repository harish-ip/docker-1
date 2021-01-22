import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteadminEmailComposeComponent } from './siteadmin-email-compose.component';

const routes: Routes = [
  {
    path: '', component: SiteadminEmailComposeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteadminEmailComposeRoutingModule { }
