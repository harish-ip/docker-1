import { Component, OnInit } from '@angular/core';

import { CouponService } from 'src/app/admin/Admin-Share/coupon.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})

export class CouponsComponent implements OnInit {

  CouponCodeswithProducts;
  errmsg = '';

  constructor(private title: PageTitleService,
    private service: CouponService) { }

  ngOnInit() {
    this.title.tenantTitle = "Coupons To Products";
    this.getcoupontoproductlist();
  }

  // Get Coupons List
  getcoupontoproductlist() {
    this.service.CouponToProductList().subscribe(
      (response) => {
        this.CouponCodeswithProducts = response;
        console.log(this.CouponCodeswithProducts);
        if (this.CouponCodeswithProducts.length == 0) {
          this.errmsg = 'No coupons are available for products';
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
