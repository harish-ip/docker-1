import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteAdminRoutingModule } from './site-admin-routing.module';
import { SiteAdminComponent } from './site-admin.component';
import { SiteADminDashboardComponent } from './site-admin-dashboard/site-admin-dashboard.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [SiteAdminComponent, SiteADminDashboardComponent],
  imports: [
    CommonModule,
    SiteAdminRoutingModule,
    ChartsModule
  ]
})
export class SiteAdminModule { }
