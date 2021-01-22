import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantDashboardRoutingModule } from './tenant-dashboard-routing.module';
import { TenantDashboardComponent } from './tenant-dashboard.component';
import { CouponcodeModule } from 'src/app/share/module/share/couponcode.module';

@NgModule({
  declarations: [
    TenantDashboardComponent
  ],
  imports: [
    CommonModule,
    TenantDashboardRoutingModule, CouponcodeModule
  ]
})

export class TenantDashboardModule { }
