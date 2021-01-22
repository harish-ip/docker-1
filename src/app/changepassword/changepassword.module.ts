import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChangepasswordRoutingModule } from './changepassword-routing.module';
import { BlockCopyPasteInTenantDirective } from './blockCopyPasteInTenant.directive';
import { MaterialModule } from 'src/app/share/module/share/material.module';
import { ChangepasswordComponent } from './changepassword.component';


@NgModule({
  declarations: [ChangepasswordComponent,
    BlockCopyPasteInTenantDirective],
  imports: [
    CommonModule,
    FormsModule,
    ChangepasswordRoutingModule,
    MaterialModule
  ]
})
export class ChangepasswordModule { }
