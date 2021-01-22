import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../share/service/authentication.service';
import { DataShareService } from '../share/service/data-share.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  username: string = null;
  password: string = null;
  pwd: string = null;
  errBoolean = false;
  loading = false;
  validations = false;
  reloadonce: string = null;
  mainLoading = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private dataShare: DataShareService) {
    this.dataShare.mainLoading.subscribe(val => {
      this.mainLoading = val;
    })
  }

  ngOnInit() { }

  loginValidations(): boolean {
    if ((this.username === null && this.pwd === null)) {
      this.toastr.error('User name and password cannot be empty', 'Error');
      return false;
    } else if ((this.username != null && this.username.trim().length == 0) && (this.pwd != null && this.pwd.trim().length == 0)) {
      this.toastr.error('User name cannot be empty', 'Error');
      return false;
    } else if (this.username === null || this.username.trim().length == 0) {
      this.toastr.error('User name cannot be empty', 'Error');
      return false;
    } else if (this.pwd === null || this.pwd.trim().length == 0) {
      this.toastr.error('Password cannot be empty', 'Error');
      return false;
    } else if (this.pwd.length < 8) {
      this.toastr.error('Password must be at least 8 characters long', 'Error');
      return false;
    } else {
      this.validations = !this.validations;
      return true;
    }
  }

  onSubmit() {
    if (this.loginValidations()) {
      this.loading = !this.loading;
      this.password = this.pwd;
      const sha = sha256(this.pwd);
      this.pwd = sha;
      this.authenticationService.authenticate(this.username, this.password)
        .subscribe(
          () => {
            this.loading = !this.loading;
            const name = this.username.charAt(0).toUpperCase() + this.username.slice(1);
            this.authenticationService.userName = name;
            /* if (this.authenticationService.decoded.auth.authority === "ROLE_ADMIN") { */
              this.router.navigate(['/admin']).then(() => {
                this.toastr.success('Login successful', 'Success');
                this.getuserdata();

              });
           /*  } else if (this.authenticationService.decoded.auth.authority == "ROLE_CLIENT_MASTER") {
              this.router.navigate(['/clientadmin']).then(() => {
                this.toastr.success('Login successful', 'Success');
                this.getuserdata();
              });
            } */
            this.dataShare.mainLoading.next(true);
          },
          error => {
            this.loading = !this.loading;
            this.pwd = null;
            console.log(error);
            if (error.status > 200 && error.status < 227) {
              this.toastr.error('Incorrect username or password', 'Error');
            } else if (error.status > 500) {
              this.toastr.error("Internal server error please try agian after sometime", 'Error');
            } else if (error.status === 0) {
              this.toastr.error("Server is not responding", 'Error');
            } else if (error.status === 500) {
              this.toastr.error(error.error.message, 'Error');
            }
          });
    }
  }

  getuserdata() {
    this.authenticationService.getUserDetails(this.username).subscribe(res => {
      // console.dir(res);
      this.dataShare.userdetails.next(res);
      // this.dataShare.userdetails.value.userImage = null;
      localStorage.setItem('userDetails', JSON.stringify(this.dataShare.userdetails.value));
      // console.dir(res['country']);
	  console.log('location >>>> '+res['country']);
      localStorage.setItem('location', res['country']);
	  localStorage.setItem('logfirstName', res['firstname']);
	  localStorage.setItem('loglastName', res['lastname']);
      this.authenticationService.userDetails.next(res['country']);
	  this.authenticationService.userDetails.next(res['firstname']);
	  this.authenticationService.userDetails.next(res['lastname']);
	  this.authenticationService.userDetails.next(res['country']);
      this.dataShare.startCount.next(true);
    }, err => {
      console.log(err);
    });
  }
}
