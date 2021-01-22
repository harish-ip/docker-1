import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Suite, Product, Coupon } from 'src/app/share/model/model';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { SuiteService } from '../../Admin-Share/suite.service';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { CouponService } from '../../Admin-Share/coupon.service';

@Component({
  selector: 'app-coupon-to-products',
  templateUrl: './coupon-to-products.component.html',
  styleUrls: ['./coupon-to-products.component.css']
})
export class CouponToProductsComponent implements OnInit {


  id: any;
  suites: Suite[];
  products: Product[];
  selectedAll: any;
  allproducts: any;
  selectedValue = [];
  errmsg = '';
  errmsg1 = '';
  nosuitesmsg = '';
  selectallchk: any;
  publishBtnDisable: boolean = false;
  loading: boolean = false;

  couponlist: Coupon[]; // For Get the Coupons List
  getcoupon: Coupon;
  localcouponcode: any;
  couponDescription = "";
  couponCode = "";
  couponprice: any;
  statusForCouponCodes = [];

  constructor(private title: PageTitleService,
    private suiteService: SuiteService,
    private data: DataShareService,
    private service: CouponService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.title.adminTitle = "Coupon To Products";
    if (this.data.couponCode) {
      this.localcouponcode = this.data.couponCode.couponCode;
      this.couponprice = this.data.couponCode.amount;
    }
    this.getcoupons(); // Get All Coupons
    this.getSuites(); // Get All Suites
  }

  // Get Coupons List
  getcoupons() {
    this.service.couponList().subscribe(
      (response) => {
        this.couponlist = response;
        // console.log(this.couponlist);
        if (this.couponlist.length == 0)
          this.errmsg = 'No coupons are available';

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

  // Get Suites List
  getSuites() {
    this.suiteService.suitesList().subscribe(
      (response) => {
        this.suites = response;
        console.log(this.suites);
        this.allproducts = this.suites[0].products;

        if (this.allproducts.length == 0) {
          this.errmsg1 = 'No products are avaliable';
          return;
        }

        if (this.couponprice) {
          this.allproducts = this.allproducts.filter(
            product => product.productPrice > this.couponprice);
        }

        if (this.allproducts.length <= 0) {
          this.errmsg1 = 'No products are suitable for this coupon code';
          return;
        }
        else
          this.errmsg1 = '';

      },
      (err) => {
        console.log(err);
        this.nosuitesmsg = err.error.message;
        this.publishBtnDisable = true;
        this.toastr.error(err.error.message, "Error");
      }
    );
  }

  issuiteName(value: string) {
    // console.log(value);
    const num = value.split(": ");
    this.id = +num[1];
  }

  // Get Products Against the Suite
  suiteProducts(value: string) {
    const a = this.suites.filter(a => a.suiteName === value);
    this.products = a[0].products;
    this.allproducts = a[0].products;
    this.errmsg1 = '';

    if (this.allproducts.length <= 0) {
      this.errmsg1 = 'No products are available';
      return;
    }

    if (this.couponprice) {
      this.allproducts = this.allproducts.filter(
        product => product.productPrice > this.couponprice);
    }

    if (this.allproducts.length <= 0) {
      this.errmsg1 = 'No products are suitable for this coupon code';
      return;
    }
    else
      this.errmsg1 = '';

    this.selectallchk = ((document.getElementById("all") as HTMLInputElement));
    this.selectallchk.checked = false;
  }

  // selectAll functionality for checkbox
  selectAll(event) {
    if (event.target.id && event.target.checked) {
      for (var i = 0; i < this.allproducts.length; i++) {
        this.allproducts[i].selected = this.selectedAll;
        this.selectedValue.push(this.allproducts[i]);
      }
      console.log(this.selectedValue);
    }
    else {
      for (var i = 0; i < this.allproducts.length; i++) {
        this.allproducts[i].selected = this.selectedAll;
      }
      this.selectedValue = [];
      console.log(this.selectedValue);
    }
  }

  // Checkbox Change Event
  change(event) {
    console.log(event.target.id);
    console.log(event.target.checked);

    if (event.target.id && event.target.checked) {
      let productIndex = this.allproducts.findIndex(a => a.productId == event.target.id);
      this.selectedValue.push(this.allproducts[productIndex]);
    }
    else {
      let index = this.selectedValue.findIndex(x => x.productId == event.target.id)
      this.selectedValue.splice(index, 1);
      this.selectallchk = ((document.getElementById("all") as HTMLInputElement));
      this.selectallchk.checked = false;
    }

    if (this.allproducts.length == this.selectedValue.length) {
      this.selectallchk = ((document.getElementById("all") as HTMLInputElement));
      this.selectallchk.checked = true;
    }

    console.log(this.selectedValue);
  }

  // View the coupon code in model
  viewCoupon(coupon: Coupon) {
    this.getcoupon = coupon;
    this.couponDescription = coupon.description;
    this.couponCode = coupon.couponCode;
  }

  // Get the coupon code from apply button click
  ApplyCoupon(code) {
    this.data.couponCode = code.couponCode;
    this.localcouponcode = this.data.couponCode;
    this.couponprice = code.amount;
    this.errmsg1 = '';
    this.getSuites();

    if (this.couponprice) {
      this.allproducts = this.allproducts.filter(
        product => product.productPrice > this.couponprice);
    }

    if (!this.allproducts.length)
      this.errmsg1 = 'No products are suitable for this coupon code';
    else
      this.errmsg1 = '';

    console.log(this.allproducts);
  }

  /* loading disable btn method */
  loadingDisable() {
    this.publishBtnDisable = false;
    this.loading = false;
  }

  // Apply Coupon code to Selected products
  couponToProduct(localcouponcode) {

    console.log(this.selectedValue);
    console.log(localcouponcode);
    this.publishBtnDisable = true;
    this.loading = true;
    if (this.selectedValue.length !== 0 && localcouponcode != undefined) {
      this.service.CouponToProduct(localcouponcode, this.selectedValue).subscribe((response) => {
        console.log(response);
        this.loadingDisable();
        this.toastr.success("Coupon code applied successfully", "Success");
        this.router.navigate(['/admin/coupons/coupon-to-productlist']);
      },
        (err) => {
          if (err.status == 500) {
            this.toastr.error(err.error.message, 'Error');
          }
          else {
            console.log(err.error.message);
          }
          this.loadingDisable();
        },
      );
    }
    else {
      if (localcouponcode == undefined) {
        this.toastr.warning('Please select coupon', 'Warning');
        this.loadingDisable();
        return
      }
    }

  }
}

