import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuiteComponent } from './suite.component';


const routes: Routes = [

  {
    path: '', component: SuiteComponent,
    children: [
      { path: '', redirectTo: 'product-list', pathMatch: 'prefix' },
      { path: 'suite-list', loadChildren: () => import('./suite-list/suite-list.module').then(m => m.SuiteListModule) },
      { path: 'create-suite', loadChildren: () => import('./create-suite/create-suite.module').then(m => m.CreateSuiteModule) },
      { path: 'edit-suite', loadChildren: () => import('./edit-suite/edit-suite.module').then(m => m.EditSuiteModule) },
      { path: 'create-product', loadChildren: () => import('./create-product/create-product.module').then(m => m.CreateProductModule) },
      { path: 'edit-product', loadChildren: () => import('./edit-product/edit-product.module').then(m => m.EditProductModule) },
      { path: 'product-list', loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SuiteRoutingModule { }
