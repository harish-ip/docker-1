import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

import { CopyPasteModule } from '../share/module/share/copy-paste.module';
import { SelectBoxModule } from '../share/module/share/select-box.module';
import { OnlyNumbresModule } from '../share/module/share/only-numbres.module';
import { ConPwdModule } from '../share/module/share/con-pwd.module';
import { SpacenotallowModule } from '../share/module/share/spacenotallow.module';
import { MaterialModule } from '../share/module/share/material.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule,
    SelectBoxModule,
    CopyPasteModule,
    OnlyNumbresModule,
    ConPwdModule,
    SpacenotallowModule,
    MaterialModule
  ]
})
export class SignupModule { }
