import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { changePwd } from 'src/app/share/model/model';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { RefundService } from 'src/app/admin/Admin-Share/refund.service';
import { TenantServiceService } from '../tenant/service/tenant-service.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})

export class ChangepasswordComponent implements OnInit {

  pwds: changePwd = null;
  conpwd: string = null;
  changePwdForm: NgForm;
  loading: boolean = false;
  changePwdDisableBtn = false;

  @ViewChild('changePwdForm', { static: true }) public passwordForm: NgForm;
  constructor(private title: PageTitleService,
    private tenantService: TenantServiceService,
    private toastr: ToastrService,
    private router: Router,
    public auth: AuthenticationService,
    private refund: RefundService, ) { }

  ngOnInit() {
    this.title.tenantTitle = "Change Password";
    this.pwds = {
      newPassword: '',
      oldPassword: ''
    };
  }

  Password() {
    if (this.pwds.oldPassword === this.pwds.newPassword) {
      return false;
    } else {
      return true;
    }
  }
  mustPassword() {
    if (this.pwds.newPassword === this.conpwd) {
      return true;
    } else {
      return false;
    }
  }

  loadDefalut() {
    this.pwds = { newPassword: '', oldPassword: '' };
    this.conpwd = '';
  }

  navigate() {
    if (this.auth.rolebase == "ROLE_CLIENT_MASTER") {
      this.router.navigate(["clientadmin/dashboard"]);
    } else if (this.auth.rolebase == "ROLE_SITE_ADMIN") {
      this.router.navigate(["siteadmin/dashboard"]);
    } else if (this.auth.rolebase == "ROLE_USER" || this.auth.rolebase == "ROLE_SITE_USER") {
      this.router.navigate(["tenant/dashboard"]);
    }
  }

  changePassword() {
    console.log(this.pwds);
    this.loading = true;
    this.changePwdDisableBtn = true;
    this.tenantService.changePassword(this.pwds).subscribe(res => {
      this.loading = false;
      this.changePwdDisableBtn = false;
      console.log(res);
      this.loadDefalut();
      this.toastr.success("Password successfully changed", "Success");
      this.auth.logout();
      this.refund.email.next(null);
      this.refund.username.next(null);
      this.router.navigate(['/signin']);
    }, err => {
      this.loading = false;
      this.changePwdDisableBtn = false;
      console.log(err);
      this.toastr.error(err.error.message, "Error");
    })
  }
}
