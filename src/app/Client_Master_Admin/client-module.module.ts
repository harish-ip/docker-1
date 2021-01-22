import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { ClientModuleRoutingModule } from './client-module-routing.module';
import { ClientModuleComponent } from './client-module.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { LoadingModule } from '../share/module/share/loading.module';

@NgModule({
  declarations: [ClientModuleComponent, ClientDashboardComponent],
  imports: [
    CommonModule,
    ClientModuleRoutingModule,
    ChartsModule, LoadingModule
  ]
})
export class ClientModuleModule { }
