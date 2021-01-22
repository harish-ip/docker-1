import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { PlatformLocation } from '@angular/common';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router,
    public dataShare: DataShareService,
    private auth: AuthenticationService) {

  }

  ngOnInit() {
    this.detectRouterChanges();
    this.detectRouterChanges_org();
  }

  detectRouterChanges() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // console.log(event.url);
        if (event.url == "/signin" || event.url == "/voicesignin" || event.url == "/" || event.url == "/signup" ||
          event.url == "/forgotpassword" || event.url == "/otpverification" || event.url == "/resetpassword" ||
          event.url == "") {
          if (this.auth.isUserLoggedIn())
            this.dataShare.footer.next(true);
          else
          this.dataShare.footer.next(false);
        }
        else {
          this.dataShare.footer.next(true);
        }
      }
    });
  }

  detectRouterChanges_org() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // console.log(event.url);
        if (event.url == "/welcome" || event.url == "/Contactus" || event.url == "/changepassword") {
          this.dataShare.orgname.next(false);
        }
        else {
          this.dataShare.orgname.next(true);
        }
      }
    });
  }

  /*  backButtonPressed() {
     this.location.onPopState(() => {
       console.log('pressed back!');
       console.log("pressed back!", this.router.url);
       if (this.router.url == '/admin/dashboard') {
         this.dataShare.footer.next(true);
       }
     });
   } */

}
