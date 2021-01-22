import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from './mustMatch';
import { AuthenticationService } from '../share/service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataShareService } from '../share/service/data-share.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  /* new password */
  newPasswordForm: FormGroup;
  resetPwdLoading: boolean = false;
  constructor(private fb: FormBuilder,
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private data: DataShareService) { }

  ngOnInit() {
    this.newPasswordForm = this.fb.group({
      newPwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      conPwd: ['', [Validators.required]]
    }, {
      validator: MustMatch('newPwd', 'conPwd')
    });
  }

  resetPassword() {
    const newPassword = this.newPasswordForm.get("newPwd").value;
    this.resetPwdLoading = true;
    this.auth.resetPassword(this.data.otpUsername.value, newPassword).subscribe(res => {
      console.log(res);
      this.toastr.success("Your password has been reset successfully", "Success");
      this.router.navigate(['/signin']);
    }, err => {
      console.log(err);
      this.resetPwdLoading = false;
      this.toastr.error(err.error.message, "Error");
    })
  }

}
