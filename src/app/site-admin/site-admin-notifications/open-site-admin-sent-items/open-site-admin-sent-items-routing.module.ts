import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenSiteAdminSentItemsComponent } from './open-site-admin-sent-items.component';

const routes: Routes = [
  {
    path: '' ,component: OpenSiteAdminSentItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenSiteAdminSentItemsRoutingModule { }
