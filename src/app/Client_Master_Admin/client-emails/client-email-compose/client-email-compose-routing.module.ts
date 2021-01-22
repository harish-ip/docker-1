import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientEmailComposeComponent } from './client-email-compose.component';

const routes: Routes = [
  {
    path: '', component: ClientEmailComposeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientEmailComposeRoutingModule { }
