import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

import { PageTitleService } from '../share/service/page-title.service';
import { AuthenticationService } from '../share/service/authentication.service';
import { CouponService } from '../admin/Admin-Share/coupon.service';
import { Product } from '../share/model/model';
import { TenantServiceService } from './service/tenant-service.service';
import { DataShareService } from '../share/service/data-share.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})

export class TenantComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    public title: PageTitleService,
    private tenantService: TenantServiceService,
    private couponservice: CouponService,
    private router: Router,
    public dataShare: DataShareService) {
  }

  newProducts: Product[];
  productscount = 0;
  couponlist: any;
  couponstoproductcount = 0;
  username;
  tenantSubscribedProducts: Product[];
  subscribedCount = 0;
  CouponCodeswithUsers: any;
  couponstousercount = 0;
  userCoupons: string[] = [];

  ngOnInit() {
    this.username = this.auth.decoded.sub;
    // this.getNewProducts();
    // this.getcouponstoproducts();
    // this.getSubscribedProducts();
    // this.getcouponstouser();
  }

  getNewProducts() {
    // const user = this.auth.getDecodedToken();
    this.tenantService.productsList().subscribe(response => {
      this.newProducts = response;
      this.productscount = this.newProducts.length;
    }, err => {
      console.log(err);
    });
  }

  getcouponstoproducts() {
    this.couponservice.CouponToProductList().subscribe(
      (response) => {
        this.couponlist = response;
        this.couponstoproductcount = this.couponlist.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSubscribedProducts() {
    // const user = this.auth.getDecodedToken();
    this.tenantService.tenantProducts().subscribe((res) => {
      console.dir(res);
      if (res !== null) {
        this.tenantSubscribedProducts = res['uniqueProducts'];
        this.subscribedCount = this.tenantSubscribedProducts.length;
      }
    }, err => {
      console.log(err);
    });
  }

  getcouponstouser() {
    this.couponservice.CouponToUsersList().subscribe(
      (response) => {
        this.CouponCodeswithUsers = response;

        for (let i = 0; i < this.CouponCodeswithUsers.length; i++) {
          for (let j = 0; j < this.CouponCodeswithUsers[i].users.length; j++) {
            if (this.CouponCodeswithUsers[i].users[j].username == this.username) {
              this.userCoupons.push(this.CouponCodeswithUsers[i].couponCode);
            }
          }
        }

        this.couponstousercount = this.userCoupons.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
