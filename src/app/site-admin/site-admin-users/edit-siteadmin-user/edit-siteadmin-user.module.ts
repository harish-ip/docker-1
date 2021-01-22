import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditSiteadminUserRoutingModule } from './edit-siteadmin-user-routing.module';
import { EditSiteadminUserComponent } from './edit-siteadmin-user.component';
import { FormsModule } from '@angular/forms';
import { OnlyNumbresModule } from 'src/app/share/module/share/only-numbres.module';
import { ConPwdModule } from 'src/app/share/module/share/con-pwd.module';

@NgModule({
  declarations: [EditSiteadminUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    OnlyNumbresModule,
    EditSiteadminUserRoutingModule,
    ConPwdModule
  ]
})
export class EditSiteadminUserModule { }
