import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SentItemsComponent } from './sent-items.component';

const routes: Routes = [
  { path: '', component: SentItemsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SentItemsRoutingModule { }
