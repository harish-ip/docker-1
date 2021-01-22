import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditClientUserComponent } from './edit-client-user.component';

const routes: Routes = [
  {
    path: '', component: EditClientUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditClientUserRoutingModule { }
