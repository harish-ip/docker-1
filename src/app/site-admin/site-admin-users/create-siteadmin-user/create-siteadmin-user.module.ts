import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateSiteadminUserRoutingModule } from './create-siteadmin-user-routing.module';
import { CreateSiteadminUserComponent } from './create-siteadmin-user.component';
import { FormsModule } from '@angular/forms';
import { OnlyNumbresModule } from 'src/app/share/module/share/only-numbres.module';
import { ConPwdModule } from 'src/app/share/module/share/con-pwd.module';

@NgModule({
  declarations: [CreateSiteadminUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    OnlyNumbresModule,
    CreateSiteadminUserRoutingModule,
    ConPwdModule
  ]
})
export class CreateSiteadminUserModule { }
