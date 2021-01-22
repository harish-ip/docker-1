import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateClientUserComponent } from './create-client-user.component';

const routes: Routes = [
  {
    path: '' , component: CreateClientUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateClientUserRoutingModule { }
