import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../share/service/authentication.service';
import { DataShareService } from '../share/service/data-share.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  username: string;
  loading: boolean = false;
  mainLoading: boolean;

  constructor(
    private auth: AuthenticationService,
    private data: DataShareService
  ) {
    this.data.mainLoading.subscribe(val => {
      this.mainLoading = val
    })

  }

  ngOnInit() {
    this.username = this.auth.userName;
    // this.getSuites();
    // this.getproducts();
    // this.getcoupons();
    // this.getTenants();
  }

  /* getSuites() {
    this.suite.AllsuitesCount().subscribe((response) => {
      console.log(response);
      this.suite.suiteCount.next(response);
    },
      (err) => {
        console.log(err);
      }
    )
  }

  getproducts() {
    this.service.AllproductsCount().subscribe((response) => {
      console.log(response);
      this.service.productsCount.next(response);
    },
      (err) => {
        console.log(err);
      }
    )
  }

  getcoupons() {
    this.couponservice.AllcouponCount().subscribe((response) => {
      console.log(response);
      this.couponservice.couponsCount.next(response);
    },
      (err) => {
        console.log(err);
      }
    );
  }

  getTenants() {
    this.Regservice.AllregisterTenantCount().subscribe((response) => {
      console.log(response);
      this.Regservice.tenantsCount.next(response);
    },
      (err) => {
        console.log(err);
      }
    )
  } */


}
