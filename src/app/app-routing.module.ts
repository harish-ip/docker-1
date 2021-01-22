import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { PreventLoggedInAccessService } from './share/service/prevent-logged-in-access.service'
import { ProductsComponent } from './products/products.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CustomPreloadingWithDelayStrategy } from './share/service/custom-preloading-with-delay-strategy';
import { AuthGaurdService } from './share/service/authGuard/auth-guard.service';
import { AuthGuardCMService } from './share/service/authGuard/auth-guard-cm.service';
import { AuthGuardSAService } from './share/service/authGuard/auth-guard-sa.service';
import { AuthGuardSUService } from './share/service/authGuard/auth-guard-su.service';
import { AuthGuardWelcomeService } from './share/service/authGuard/auth-guard-welcome.service';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGaurdService], data: { preload: false, delay: 2000 } },
  { path: 'clientadmin', loadChildren: () => import('./Client_Master_Admin/client-module.module').then(m => m.ClientModuleModule), canActivate: [AuthGuardCMService], data: { preload: false, delay: 2000 } },
  { path: 'siteadmin', loadChildren: () => import('./site-admin/site-admin.module').then(m => m.SiteAdminModule), canActivate: [AuthGuardSAService], data: { preload: false, delay: 2000 } },
  { path: 'tenant', loadChildren: () => import('./tenant/tenant.module').then(m => m.TenantModule), canActivate: [AuthGuardSUService], data: { preload: false, delay: 2000 } },
  { path: 'signin', loadChildren: () => import('./signin/signin.module').then(mod => mod.SigninModule), canActivate: [PreventLoggedInAccessService] },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule), canActivate: [PreventLoggedInAccessService] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGaurdService] },
  { path: 'viewcart', component: ViewcartComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuardWelcomeService] },
  { path: 'voicesignin', loadChildren: () => import('./voice-signin/voice-signin.module').then(mod => mod.VoiceSigninModule), canActivate: [PreventLoggedInAccessService] },
  { path: 'Contactus', loadChildren: () => import('./contact-us/contact-us.module').then(mod => mod.ContactUsModule) },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'otpverification', loadChildren: () => import('./otp-verification/otp-verification.module').then(m => m.OtpVerificationModule) },
  { path: 'resetpassword', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: 'changepassword', loadChildren: () => import('./changepassword/changepassword.module').then(m => m.ChangepasswordModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadingWithDelayStrategy
  })],
  exports: [RouterModule],
  providers: [CustomPreloadingWithDelayStrategy]
})

export class AppRoutingModule { }