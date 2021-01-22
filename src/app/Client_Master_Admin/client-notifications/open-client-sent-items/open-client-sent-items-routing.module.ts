import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenClientSentItemsComponent } from './open-client-sent-items.component';

const routes: Routes = [
  {
    path : '',component :OpenClientSentItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenClientSentItemsRoutingModule { }
