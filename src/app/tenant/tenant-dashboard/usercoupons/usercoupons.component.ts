import { Component, OnInit } from '@angular/core';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { CouponService } from 'src/app/admin/Admin-Share/coupon.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { TenantCoupons } from 'src/app/share/model/model';

@Component({
  selector: 'app-usercoupons',
  templateUrl: './usercoupons.component.html',
  styleUrls: ['./usercoupons.component.css']
})

export class UsercouponsComponent implements OnInit {

  CouponCodeswithUsers: TenantCoupons[];
  errmsg = '';
  username: string;
  email: string;
  userCoupons: string[] = [];
  constructor(private title: PageTitleService,
    private service: CouponService,
    private auth: AuthenticationService, ) { }

  ngOnInit() {
    this.title.tenantTitle = "Coupons To User";
    this.username = this.auth.decoded.sub;
    this.email = localStorage.getItem('email');
    this.getcoupontouserlist();
  }

  // Get Coupons List
  getcoupontouserlist() {
    this.service.CouponToUsersList().subscribe(
      (response) => {
        this.CouponCodeswithUsers = response;
        this.getTenantCoupons();
        console.log(this.CouponCodeswithUsers);
        if (this.CouponCodeswithUsers.length == 0) {
          this.errmsg = 'No coupons are available for users';
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTenantCoupons() {
    for (let i = 0; i < this.CouponCodeswithUsers.length; i++) {
      for (let j = 0; j < this.CouponCodeswithUsers[i].users.length; j++) {
        if (this.CouponCodeswithUsers[i].users[j].username == this.username) {
          this.userCoupons.push(this.CouponCodeswithUsers[i].couponCode);
        }
      }
    }

    console.log(this.userCoupons);
    if (this.userCoupons.length == 0) {
      this.errmsg = 'No coupons are available for users';
    }

  }

}
