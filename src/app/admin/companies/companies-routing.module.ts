import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies.component';

const routes: Routes = [
  {
    path: '', component: CompaniesComponent,
    children: [
      { path: '', redirectTo: 'companies-list', pathMatch: 'prefix' },
      { path: 'create-company', loadChildren: () => import('./create-company/create-company.module').then(m => m.CreateCompanyModule) },
      { path: 'companies-list', loadChildren: () => import('./companies-list/companies-list.module').then(m => m.CompaniesListModule) },
      { path: 'edit-company', loadChildren: () => import('./edit-company/edit-company.module').then(m => m.EditCompanyModule) },
      { path: 'extend-subscription', loadChildren: () => import('./extend-subscription/extend-subscription.module').then(m => m.ExtendSubscriptionModule) }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
