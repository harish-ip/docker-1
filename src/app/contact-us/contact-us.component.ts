import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contactus } from 'src/app/share/model/model';
import { RegisterService } from 'src/app/share/service/register.service';
import { AuthenticationService } from '../share/service/authentication.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {

  spin = false;
  username;

  contactus: Contactus = {
    firstName: null,
    lastName: null,
    email: null,
    subject: null,
    message: null
  };

  constructor(private router: Router,
    private toastr: ToastrService,
    private service: RegisterService,
    public auth: AuthenticationService) { }

  ngOnInit() {
    if (this.auth.islogin)
      this.username = this.auth.decoded.sub;
    else
      this.username = null;
  }

  navigate() {
    if (this.auth.rolebase == "ROLE_CLIENT_MASTER") {
      this.router.navigate(["clientadmin/dashboard"]);
    } else if (this.auth.rolebase == "ROLE_SITE_ADMIN") {
      this.router.navigate(["siteadmin/dashboard"]);
    } else if (this.auth.rolebase == "ROLE_USER" || this.auth.rolebase == "ROLE_SITE_USER") {
      this.router.navigate(["tenant/dashboard"]);
    }
    else {
      this.router.navigate(["/welcome"]);
    }
  }

  contactUs() {
    this.spin = true;
    this.service.isContact(this.contactus).subscribe(
      () => {
        console.log(this.contactus);
        this.spin = false;
        this.toastr.success("Thank you for contacting us", 'Success');
        if (this.auth.islogin) {
          if (this.auth.rolebase == "ROLE_CLIENT_MASTER") {
            this.router.navigate(["clientadmin/dashboard"]);
          } else if (this.auth.rolebase == "ROLE_SITE_ADMIN") {
            this.router.navigate(["siteadmin/dashboard"]);
          } else if (this.auth.rolebase == "ROLE_USER" || this.auth.rolebase == "ROLE_SITE_USER") {
            this.router.navigate(["tenant/dashboard"]);
          }
        } else
          this.router.navigate(['/welcome']);
      },
      (err) => {
        this.spin = false;
        console.log(err);
      }
    )
  }
}
