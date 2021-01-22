import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Coupon } from 'src/app/share/model/model';
import { CouponService } from '../../Admin-Share/coupon.service';

@Component({
  selector: 'app-generate-coupon',
  templateUrl: './generate-coupon.component.html',
  styleUrls: ['./generate-coupon.component.css']
})
export class GenerateCouponComponent implements OnInit {

  coupon: Coupon = {
    couponCode: null,
    validFrom: null,
    validTo: null,
    amount: null,
    description: null
  };

  randomCouponCode = 'PaaS-';
  minFromDate;
  maxFromDate;
  minToDate;
  maxToDate;
  validfrom: NgbDate;
  validtoo: NgbDate;
  errmsg = '';

  constructor(private title: PageTitleService,
    private service: CouponService,
    private toastr: ToastrService,
    private router: Router,
    private calendar: NgbCalendar) {
    this.minFromDate = this.calendar.getToday();
    this.maxFromDate = this.calendar.getNext(this.calendar.getToday(), 'd', 30);

    console.log(this.minFromDate);
    console.log(this.maxFromDate);
  }

  ngOnInit() {
    this.title.adminTitle = "Generate Coupon";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 8;
    this.makeRandom(lengthOfCode, possible);
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    this.randomCouponCode = 'PaaS-';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log(text);
    this.randomCouponCode = this.randomCouponCode + text.substr(0, 4) + '-' + text.substr(4, 4);
    console.log(this.randomCouponCode)
    this.coupon.couponCode = this.randomCouponCode;
  };

  settodates(e) {
    console.log(e);

    console.log(this.validtoo);

    if (this.validtoo) {
      const fromdate: Date = new Date(e.year, e.month - 1, e.day);
      const todate: Date = new Date(this.validtoo.year, this.validtoo.month - 1, this.validtoo.day);
      if (fromdate.getTime() > todate.getTime()) {
        this.errmsg = "From date is must less than to date";
      }
    }

    this.minToDate = this.calendar.getNext(e, 'd', 1);
    console.log(this.minToDate);

    this.maxToDate = this.calendar.getNext(e, 'd', 30);
    console.log(this.maxToDate);
  }

  createcoupon() {
    console.log(new Date(this.validfrom.year + '/' + this.validfrom.month + '/' + this.validfrom.day));
    console.log(new Date(this.validtoo.year + '/' + this.validtoo.month + '/' + this.validtoo.day));

    this.coupon.validFrom = new Date(this.validfrom.year + '/' + this.validfrom.month + '/' + this.validfrom.day);
    this.coupon.validTo = new Date(this.validtoo.year + '/' + this.validtoo.month + '/' + this.validtoo.day);

    console.log(this.coupon);

    this.service.createCoupon(this.coupon).subscribe((res) => {
      console.log(res);
      const val = this.service.couponsCount.value + 1;
      this.service.couponsCount.next(val);
      this.toastr.success("Coupon generated successfully", "Success");
      this.router.navigate(['/admin/coupons/coupons-list']);
    },
      (err) => {
        console.log(err);
        if (err.status == 500) {
          this.toastr.error(err.error.message, 'Error');
        }
      },
    );
  }

}

