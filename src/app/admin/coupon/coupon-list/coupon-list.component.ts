import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Coupon, Product, Suite } from 'src/app/share/model/model';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { CouponService } from '../../Admin-Share/coupon.service';
declare var $: any;

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {

  coupon: Coupon = {
    couponCode: null,
    validFrom: null,
    validTo: null,
    amount: null,
    description: null,
    createdDate: null
  };

  errmsg = '';
  Editcoupon: Coupon;
  getcoupon: Coupon;
  couponDescription = "";
  viewedcouponCode = "";
  products: Product[];
  suites: Suite[];
  couponlist: Coupon[]; // For Get the Coupons List
  statusForCouponCodes = [];

  minFromDate;
  maxFromDate;
  minToDate;
  maxToDate;
  validfrom: NgbDateStruct = null;
  validtoo: NgbDateStruct = null;
  amount1;
  description1;

  constructor(private title: PageTitleService,
    private data: DataShareService,
    private toastr: ToastrService,
    private router: Router,
    private couponservice: CouponService,
    private calendar: NgbCalendar) { }

  ngOnInit() {
    this.title.adminTitle = "Coupon List"
    this.getcouponslist();
  }

  // Get Coupons List
  getcouponslist() {
    this.couponservice.couponList().subscribe(
      (response) => {
        this.couponlist = response;

        console.log(this.couponlist);

        if (this.couponlist.length == 0)
          this.errmsg = 'No Coupons are Available';

        for (let i = 0; i < this.couponlist.length; i++) {
          const date1 = new Date(this.couponlist[i].validFrom);
          const date2 = new Date(this.couponlist[i].validTo);

          if (date2.getTime() > date1.getTime()) {
            const diff = Math.abs(date1.getTime() - date2.getTime());
            const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
            this.statusForCouponCodes[i] = diffDays;
          }
          else {
            this.statusForCouponCodes[i] = 0;
          }

        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // View Model Popup
  viewCoupon(coupon: Coupon) {
    this.getcoupon = coupon;
    this.couponDescription = coupon.description;
    this.viewedcouponCode = coupon.couponCode;
  }

  // Edit Model Popup
  GetCoupon(coupon: Coupon) {
    console.log(coupon);

    this.Editcoupon = coupon;

    const validFrom: Date = new Date(this.Editcoupon.validFrom);
    const validTo: Date = new Date(this.Editcoupon.validTo);

    this.validfrom = { 'year': validFrom.getFullYear(), 'month': validFrom.getMonth() + 1, 'day': validFrom.getDate() };
    this.validtoo = { 'year': validTo.getFullYear(), 'month': validTo.getMonth() + 1, 'day': validTo.getDate() };

    this.amount1 = this.Editcoupon.amount;
    this.description1 = this.Editcoupon.description;
    this.settodates(this.validfrom)

  }

  settodates(e) {
    console.log(e);

    this.minFromDate = e;
    console.log(this.minFromDate);
    this.maxFromDate = this.calendar.getNext(e, 'd', 30);
    console.log(this.maxFromDate);


    this.minToDate = this.calendar.getNext(e, 'd', 1);
    console.log(this.minToDate);

    this.maxToDate = this.calendar.getNext(e, 'd', 30);
    console.log(this.maxToDate);
  }

  // Edit Model Popup click on form submit
  updatecoupon() {
    console.log(this.Editcoupon);

    this.Editcoupon.validFrom = new Date(this.validfrom.year + '/' + this.validfrom.month + '/' + this.validfrom.day);
    this.Editcoupon.validTo = new Date(this.validtoo.year + '/' + this.validtoo.month + '/' + this.validtoo.day);
    this.Editcoupon.amount = this.amount1;
    this.Editcoupon.description = this.description1;
    console.log(this.Editcoupon);

    if (this.Editcoupon) {
      this.couponservice.updateCoupon(this.Editcoupon).subscribe(
        (res) => {
          console.log(res);
          this.toastr.success(`Coupon code updated successfully with coupon code ${this.Editcoupon.couponCode}`, "Success");
          $(document).ready(function () {
            $("#Edit").modal("hide");
          });
          this.getcouponslist();
        },
        (err) => {
          if (err.status == 500) {
            this.toastr.warning(err.error.message, "Warning");
          }
          console.log(err);
        }
      );
    }
  }

  // Delete coupon
  DeleteCoupon(couponcode) {
    console.log(couponcode);
    this.couponservice.deletecoupon(couponcode).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(`Coupon with coupon code ${couponcode} deleted successfully`, "Success");
        this.getcouponslist();
        const val = this.couponservice.couponsCount.value - 1;
        this.couponservice.couponsCount.next(val);
        $(document).ready(function () {
          $("#Delete").modal("hide");
        });
      },
      (err) => {
        /* if (err.status == 200) {
          console.log("in err 200", err);
          this.toastr.success(`Coupon with coupon code ${couponcode} deleted successfully`, "Success");
          this.getcouponslist();
          this.couponservice.couponsCount--;
          $(document).ready(function () {
            $("#Delete").modal("hide");
          });
        } */
        console.log(err);
        const error = JSON.parse(err);
        if (error['status'] == 500) {
          this.toastr.error(err.error.message, "Error");
          $(document).ready(function () {
            $("#Delete").modal("hide");
          });
        }
      }
    );
  }

  // Assign coupon to Product when Apply button click
  CouponToProduct(code) {
    // console.log(code);
    this.data.couponCode = code;
    this.router.navigate(['/admin/coupons/coupon-to-products']);
  }

}
