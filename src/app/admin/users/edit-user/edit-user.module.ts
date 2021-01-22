import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { OnlyNumbresModule } from 'src/app/share/module/share/only-numbres.module';
import { ConPwdModule } from 'src/app/share/module/share/con-pwd.module';
import { EditUserComponent } from './edit-user.component';

@NgModule({
  declarations: [EditUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    EditUserRoutingModule,
    OnlyNumbresModule,
    ConPwdModule
  ]
})
export class EditUserModule { }
