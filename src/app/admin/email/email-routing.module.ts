import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailComponent } from './email.component';

const routes: Routes = [
  {
    path: '', component: EmailComponent,
    children: [
      { path: '', redirectTo: 'email-list', pathMatch: 'prefix' },
      { path: 'email-list', loadChildren: () => import('./email-list/email-list.module').then(m => m.EmailListModule) },
      { path: 'mail-compose', loadChildren: () => import('./mail-compose/mail-compose.module').then(m => m.MailComposeModule) },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
