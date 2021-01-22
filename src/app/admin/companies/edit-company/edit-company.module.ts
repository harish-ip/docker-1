import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EditCompanyRoutingModule } from './edit-company-routing.module';
import { OnlyNumbresModule } from 'src/app/share/module/share/only-numbres.module';
import { ConPwdModule } from 'src/app/share/module/share/con-pwd.module';
import { EditCompanyComponent } from './edit-company.component';

@NgModule({
  declarations: [EditCompanyComponent],
  imports: [
    CommonModule,
    FormsModule,
    EditCompanyRoutingModule,
    OnlyNumbresModule,
    ConPwdModule
  ]
})
export class EditCompanyModule { }
