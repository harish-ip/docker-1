import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { CouponService } from '../../Admin-Share/coupon.service';
import { Coupon } from 'src/app/share/model/model';
import { TenantListService } from '../../Admin-Share/tenant-list.service';

@Component({
  selector: 'app-coupon-to-tenant',
  templateUrl: './coupon-to-tenant.component.html',
  styleUrls: ['./coupon-to-tenant.component.css']
})
export class CouponToTenantComponent implements OnInit {

  couponlist: Coupon[];
  statusForCouponCodes = [];
  getcoupon: Coupon;
  couponDescription = "";
  couponCode = "";
  localcouponcode: any;
  couponprice: any;
  errmsg = '';
  usersList = [];
  selectedAll: any;
  selectedUsers = [];
  publishBtnDisable: boolean = false;
  loading: boolean = false;
  selectallchk: any;
  usrerrmsg: any;

  constructor(private title: PageTitleService,
    private userservice: TenantListService,
    private data: DataShareService,
    private service: CouponService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.title.adminTitle = "Coupon To Tenant";
    this.getcoupons(); // Get All Coupons
    this.getUsersList(); // get all users
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
          const date1 = new Date(this.couponlist[i].validTo);
          const date2 = new Date();
          const diff = Math.abs(date1.getTime() - date2.getTime());
          const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          this.statusForCouponCodes[i] = diffDays;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Get users list
  getUsersList() {
    this.userservice.registerTenant().subscribe(
      (response) => {
        console.log(response);

        for (let i = 0; i < response.length; i++) {
          if (response[i].role !== 'ROLE_ADMIN') {
            this.usersList.push(response[i]);
          }
        }

        if (this.usersList.length == 0)
          this.usrerrmsg = 'No tenants are available';

      },
      (err) => {
        console.log(err);
      }
    );
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
  }

  // selectAll functionality for checkbox
  selectAll(event) {
    if (event.target.id && event.target.checked) {
      for (var i = 0; i < this.usersList.length; i++) {
        this.usersList[i].selected = this.selectedAll;
        this.usersList[i].couponCode = this.localcouponcode;
        this.selectedUsers.push(this.usersList[i]);
      }
      console.log(this.selectedUsers);
    }
    else {
      for (var i = 0; i < this.usersList.length; i++) {
        this.usersList[i].selected = this.selectedAll;
      }
      this.selectedUsers = [];
      console.log(this.selectedUsers);
    }
  }

  // Checkbox Change Event
  change(event) {
    console.log(event.target.id);
    console.log(event.target.checked);
    console.log(this.usersList);

    if (event.target.id && event.target.checked) {
      let productIndex = this.usersList.findIndex(a => a.userId == event.target.id);
      console.log(productIndex);
      console.log(this.usersList[productIndex]);
      this.usersList[productIndex].couponCode = this.localcouponcode;
      this.selectedUsers.push(this.usersList[productIndex]);
      if (this.usersList.length == this.selectedUsers.length) {
        this.selectallchk = ((document.getElementById("All") as HTMLInputElement));
        this.selectallchk.checked = true;
      }
    }
    else {
      let index = this.selectedUsers.findIndex(x => x.userId == event.target.id)
      this.selectedUsers.splice(index, 1);
      this.selectallchk = ((document.getElementById("All") as HTMLInputElement));
      this.selectallchk.checked = false;
    }

    console.log(this.selectedUsers);
  }


  // Apply Coupon code to Selected Users
  couponToUser(localcouponcode) {

    console.log(this.selectedUsers);
    console.log(localcouponcode);
    this.loading = true;
    this.publishBtnDisable = true;
    if (this.selectedUsers.length !== 0 && localcouponcode != undefined) {
      this.service.CouponToUser(localcouponcode, this.selectedUsers).subscribe((response) => {
        console.log(response);
        this.loading = false;
        this.publishBtnDisable = false;
        this.toastr.success("Coupon code applied successfully", "Success");
        this.router.navigate(['/admin/coupons/coupon-to-userlist']);
      },
        (err) => {
          if (err.status == 500) {
            this.toastr.error(err.error.message, 'Error');
          }
          else {
            console.log(err.error.message);
          }
          this.loading = false;
          this.publishBtnDisable = false;
        },
      );
    }
    else {
      if (localcouponcode == undefined) {
        this.toastr.warning('Please select coupon', 'Warning');
        this.loading = false;
        this.publishBtnDisable = false;
        return
      }
    }

  }

}
