import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from '../share/service/data-share.service';
import { Router } from '@angular/router';

declare var $;
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {

  /* OTP page variables */
  otpNum1: string = null;
  otpNum2: string = null;
  otpNum3: string = null;
  otpNum4: string = null;
  otp: string = '';
  loadingOTP: boolean = false;

  backEndOTP = null;
  disabledOtpBtn: boolean = false;

  constructor(private toastr: ToastrService,
    private data: DataShareService,
    private router: Router) { }

  ngOnInit() {
    this.otpKeyUp();
  }

  otpKeyUp() {
    $(document).ready(function () {
      $('body').on('keyup', 'input.otp', function (e) {
        var key = e.keyCode || e.charCode;
        var inputs = $('input.otp');
        console.log(inputs);
        console.log("val " + $(this).val());
        console.log(this.size);
        if (($(this).val().length == this.size) && key != 32 && key != 8) {
          console.log("in ", inputs.index(this));
          inputs.eq(inputs.index(this) + 1).focus();
        }
        if (key == 8 || key == 46) {
          var indexNum = inputs.index(this);
          if (indexNum != 0) {
            inputs.eq(inputs.index(this) - 1).val('').focus();
          }
        }
      });
    });
  }

  /* validations for OTP */
  validateOTP(): boolean {
    if (this.otpNum1 == null || this.otpNum1 == undefined) {
      this.toastr.warning("Please enter OTP", "Warning");
      return false;
    } else if (this.otpNum2 == null || this.otpNum2 == undefined) {
      this.toastr.warning("Please enter OTP", "Warning");
      return false;
    } else if (this.otpNum3 == null || this.otpNum3 == undefined) {
      this.toastr.warning("Please enter OTP", "Warning");
      return false;
    } else if (this.otpNum4 == null || this.otpNum4 == undefined) {
      this.toastr.warning("Please enter OTP", "Warning");
      return false;
    } else {
      return true
    }
  }


  verifyOtp() {
    if (this.validateOTP()) {
      this.otp = this.otpNum1 + this.otpNum2 + this.otpNum3 + this.otpNum4;
      console.log(this.otp);
      this.loadingOTP = true;
      this.disabledOtpBtn = true;
      if (this.data.otp.value == this.otp) {
        this.loadingOTP = false;
        this.disabledOtpBtn = false;
        this.data.otp.next(null);
        this.toastr.success("OTP verified", "Success");
        this.router.navigate(['/resetpassword']);
      } else {
        this.loadingOTP = false;
        this.disabledOtpBtn = false;
        this.toastr.error("Incorrect OTP", "Error");
        this.otp = '';
        this.otpNum1 = '';
        this.otpNum2 = '';
        this.otpNum3 = '';
        this.otpNum4 = '';
        const focus = document.getElementById('otp1') as HTMLInputElement;
        focus.focus();
      }
    }
  }
}
