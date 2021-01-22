import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateUserRoutingModule } from './create-user-routing.module';
import { SelectBoxModule } from 'src/app/share/module/share/select-box.module';
import { ConPwdModule } from 'src/app/share/module/share/con-pwd.module';
import { CopyPasteModule } from 'src/app/share/module/share/copy-paste.module';
import { OnlyNumbresModule } from 'src/app/share/module/share/only-numbres.module';
import { CreateUserComponent } from './create-user.component';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    CreateUserRoutingModule,
    SelectBoxModule,
    ConPwdModule,
    CopyPasteModule,
    OnlyNumbresModule
  ]
})
export class CreateUserModule { }
