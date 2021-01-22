import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { SpacenotallowModule } from '../share/module/share/spacenotallow.module';
import { CopyPasteModule } from '../share/module/share/copy-paste.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SpacenotallowModule,
    CopyPasteModule
  ]
})
export class ResetPasswordModule { }
