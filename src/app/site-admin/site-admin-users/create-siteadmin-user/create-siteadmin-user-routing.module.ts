import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSiteadminUserComponent } from './create-siteadmin-user.component';

const routes: Routes = [
  {
    path: '', component: CreateSiteadminUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateSiteadminUserRoutingModule { }
