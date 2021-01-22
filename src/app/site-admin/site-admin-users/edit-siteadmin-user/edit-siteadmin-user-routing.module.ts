import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSiteadminUserComponent } from './edit-siteadmin-user.component';

const routes: Routes = [
  {
    path: '', component: EditSiteadminUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditSiteadminUserRoutingModule { }
