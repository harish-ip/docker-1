import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoiceSigninComponent } from './voice-signin.component';

const routes: Routes = [
  { path: '', component: VoiceSigninComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoiceSigninRoutingModule { }
