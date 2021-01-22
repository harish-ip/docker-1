import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantComponent } from './tenant.component';
import { SelectedurlComponent } from './selectedurl/selectedurl.component';

@NgModule({
  declarations: [TenantComponent, SelectedurlComponent],
  imports: [
    CommonModule,
    TenantRoutingModule
  ]
})

export class TenantModule { }
