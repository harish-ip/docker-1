import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OtpVerificationRoutingModule } from './otp-verification-routing.module';
import { OtpVerificationComponent } from './otp-verification.component';
import { OnlyNumbresModule } from '../share/module/share/only-numbres.module';

@NgModule({
  declarations: [OtpVerificationComponent],
  imports: [
    CommonModule,
    OtpVerificationRoutingModule, FormsModule, OnlyNumbresModule
  ]
})
export class OtpVerificationModule { }
