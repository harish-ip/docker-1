import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditClientUserRoutingModule } from './edit-client-user-routing.module';
import { FormsModule } from '@angular/forms';
import { EditClientUserComponent } from './edit-client-user.component';
import { OnlyNumbresModule } from 'src/app/share/module/share/only-numbres.module';
import { ConPwdModule } from 'src/app/share/module/share/con-pwd.module';

@NgModule({
  declarations: [EditClientUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    OnlyNumbresModule,
    EditClientUserRoutingModule,
    ConPwdModule
  ]
})
export class EditClientUserModule { }
