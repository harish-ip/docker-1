import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientEmailListComponent } from './client-email-list.component';

const routes: Routes = [
  {
    path: '', component: ClientEmailListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientEmailListRoutingModule { }
