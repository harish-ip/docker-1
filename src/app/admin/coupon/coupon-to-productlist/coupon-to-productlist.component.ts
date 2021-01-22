import { Component, OnInit } from '@angular/core';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { CouponService } from '../../Admin-Share/coupon.service';

@Component({
  selector: 'app-coupon-to-productlist',
  templateUrl: './coupon-to-productlist.component.html',
  styleUrls: ['./coupon-to-productlist.component.css']
})

export class CouponToProductlistComponent implements OnInit {

  CouponCodeswithProducts;
  errmsg = '';

  constructor(private title: PageTitleService,
    private service: CouponService) { }

  ngOnInit() {
    this.title.adminTitle = "Coupon To Product List";
    this.getcoupontoproductlist();
  }

  // Get Coupons List
  getcoupontoproductlist() {
    this.service.CouponToProductList().subscribe(
      (response) => {
        this.CouponCodeswithProducts = response;
        if (this.CouponCodeswithProducts.length == 0)
          this.errmsg = 'No coupons are available for products';

        console.log(this.CouponCodeswithProducts);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
