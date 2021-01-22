import { Component, OnInit } from '@angular/core';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { CouponService } from '../../Admin-Share/coupon.service';

@Component({
  selector: 'app-coupon-to-tenantlist',
  templateUrl: './coupon-to-tenantlist.component.html',
  styleUrls: ['./coupon-to-tenantlist.component.css']
})
export class CouponToTenantlistComponent implements OnInit {

  CouponCodeswithUsers;
  errmsg = '';

  constructor(private title: PageTitleService,
    private service: CouponService) { }

  ngOnInit() {
    this.title.adminTitle = "Coupon To Tenant List";
    this.getcoupontouserlist();
  }

  // Get Coupons List
  getcoupontouserlist() {
    this.service.CouponToUsersList().subscribe(
      (response) => {
        this.CouponCodeswithUsers = response;
        if (this.CouponCodeswithUsers.length == 0)
          this.errmsg = 'No coupons are available for tenants';

        console.log(this.CouponCodeswithUsers);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}

