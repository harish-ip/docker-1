import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientSentitemsComponent } from './client-sentitems.component';

const routes: Routes = [
  {
    path : '',component: ClientSentitemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSentitemsRoutingModule { }
