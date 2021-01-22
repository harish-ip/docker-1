import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenSentItemsComponent } from './open-sent-items.component';

const routes: Routes = [
  {
    path: '', component: OpenSentItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenSentItemsRoutingModule { }
