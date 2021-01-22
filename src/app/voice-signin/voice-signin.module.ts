import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoiceSigninRoutingModule } from './voice-signin-routing.module';
import { MaterialModule } from '../share/module/share/material.module';
import { VoiceSigninComponent } from './voice-signin.component';

@NgModule({
  declarations: [VoiceSigninComponent],
  imports: [
    CommonModule,
    VoiceSigninRoutingModule,
    MaterialModule
  ]
})
export class VoiceSigninModule { }
