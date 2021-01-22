import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientEmailsComponent } from './client-emails.component';

const routes: Routes = [
  {
    path: '', component: ClientEmailsComponent,
    children: [
      { path: '', redirectTo: 'client-email-list', pathMatch: 'prefix' },
      { path: 'client-email-list', loadChildren: () => import('./client-email-list/client-email-list.module').then(m => m.ClientEmailListModule) },
      { path: 'client-email-compose', loadChildren: () => import('./client-email-compose/client-email-compose.module').then(m => m.ClientEmailComposeModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientEmailsRoutingModule { }
