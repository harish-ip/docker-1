import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AuthenticationService } from '../share/service/authentication.service';
import { DataShareService } from '../share/service/data-share.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})

export class ForgotpasswordComponent implements OnInit {

  loading: boolean = false;
  username: string = '';
  submitBtnDisable: boolean = false;

  constructor(private auth: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private data: DataShareService) { }

  ngOnInit() {
  }

  onSubmit() {

    console.log(this.username);

    if (this.username == null || this.username.length == 0) {
      this.toastr.warning("User name shouldn't be empty", 'Warning');
      return;
    }
    const regPat = new RegExp(/[!@#$%^&*\s(),.?":{}|<>]/g);

    if (regPat.test(this.username)) {
      this.toastr.warning("User name allows only alphanumeric", 'Warning');
      return;
    };

    if (this.username != null) {
      this.loading = true;
      this.submitBtnDisable = true;
      this.auth.forgotPassword(this.username.trim()).subscribe(res => {
        this.loading = false;
        console.log(res);
        this.data.otpUsername.next(this.username);
        const email = res['email'];
        this.data.otp.next(res['otp']);
        // Email manipulation
        const indexAt = email.lastIndexOf("@");
        email.slice(2, indexAt - 2);
        const match = email.slice(2, indexAt - 2);
        const repeat = "x".repeat(match.length);
        const ReplaceEmail = email.replace(match, repeat);
        // Email manipulation End 
        this.toastr.success("OTP sent to registered email of " + ReplaceEmail, "Success");
        this.router.navigate(['/otpverification']);

      }, err => {
        this.loading = false;
        this.submitBtnDisable = false;
        this.toastr.error(err.error.message, "Error");
      });

    }
  }


}


