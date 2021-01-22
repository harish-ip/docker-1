import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteAdminSentItemsComponent } from './site-admin-sent-items.component';

const routes: Routes = [
  {
    path: '' ,component: SiteAdminSentItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteAdminSentItemsRoutingModule { }
