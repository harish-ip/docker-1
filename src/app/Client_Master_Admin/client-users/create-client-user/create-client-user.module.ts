import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateClientUserRoutingModule } from './create-client-user-routing.module';
import { CreateClientUserComponent } from './create-client-user.component';
import { FormsModule } from '@angular/forms';
import { OnlyNumbresModule } from 'src/app/share/module/share/only-numbres.module';
import { ConPwdModule } from 'src/app/share/module/share/con-pwd.module';

@NgModule({
  declarations: [CreateClientUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    OnlyNumbresModule,
    CreateClientUserRoutingModule,
    ConPwdModule
  ]
})
export class CreateClientUserModule { }
