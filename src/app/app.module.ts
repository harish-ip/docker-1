import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ScrolltopComponent } from './scrolltop/scrolltop.component';
import { ProductsComponent } from './products/products.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AuthInterceptor } from './share/service/http-auth-interceptor';
import { OnlyNumbresModule } from './share/module/share/only-numbres.module';
import { CouponcodeModule } from './share/module/share/couponcode.module';
import { SanitizerModule } from './share/module/share/sanitizer.module';
import { LoadingModule } from './share/module/share/loading.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    ViewcartComponent,
    ScrolltopComponent,
    ProductsComponent,
    ForgotpasswordComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    OnlyNumbresModule,
    CouponcodeModule,
    SanitizerModule,
    LoadingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
  ],
  exports: [HeaderComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule { }  