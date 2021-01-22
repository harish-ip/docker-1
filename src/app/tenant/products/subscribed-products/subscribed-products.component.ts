import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { TenantServiceService } from '../../service/tenant-service.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Product } from 'src/app/share/model/model';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribed-products',
  templateUrl: './subscribed-products.component.html',
  styleUrls: ['./subscribed-products.component.css']
})

export class SubscribedProductsComponent implements OnInit {

  tenantSubscribedProducts: Product[] = [];  // To get the Subscribed Products
  timeFromBackEnd: string = null;
  showSubscribedProducts = false;
  // dateTime = require('date-time');
  newDate = [];
  status = [];
  buttonEnable = [];
  ExtentionDate: number[] = [];
  selectedProd: Product;
  token: string = '';
  username: any;
  daysLeft: any[] = [];
  expanded: boolean[] = [];
  productIcon = [];
  p = 1;
  tSubscribedProducts: any;
  selproductId;
  selProductLicenseID;
  constructor(private tenantService: TenantServiceService,
    public title: PageTitleService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    public sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit() {
    this.title.tenantTitle = "Subscribed Products";
    this.getDateTime();
    this.getSubscribedProducts();
  }

  getSubscribedProducts() {
    this.title.isLoding = false;
    this.tenantService.tenantProducts().subscribe((res) => {
      console.dir(res);
      if (res !== null) {
        this.tSubscribedProducts = res;
  this.tSubscribedProducts.forEach((val, i) => {
	this.tenantService.getProducts(val['productId']).subscribe((response) => {
	 const obj = Object.assign(this.tSubscribedProducts[i],response);
	 obj['productName'] = response.productName;
	 obj['productIcon'] = response.productIcon;
	 obj['subscribedBy'] = response.subscribedBy;
	 obj['productDescription'] = response.productDescription;
	 this.tSubscribedProducts.push(obj);
	});
  });
        if (this.auth.rolebase == 'ROLE_SITE_USER') {
         this.tenantSubscribedProducts = this.tSubscribedProducts;
  this.tenantSubscribedProducts = this.tSubscribedProducts.filter(function (a) {
    return !this[a.productId] && (this[a.productId] = true);
  }, Object.create(null));
        }
        if (this.tenantSubscribedProducts) {
          if (this.tenantSubscribedProducts.length != 0) {
            this.getDateTime();
            // setTimeout(() => { this.daysLeftMethod(); }, 1000);
            this.daysLeftMethod();
            this.showSubscribedProducts = true;
          }
        }
        this.title.isLoding = true;
      }
      this.getbooleanvalues();
    }, err => {
      if (err.status == 417) {
        console.log(err);
        this.toastr.warning(`No subscribed products for this user ${this.auth.userName}`, 'Warning');
        // setTimeout(() => { this.title.isLoding = true; }, 1500);
        this.title.isLoding = true;
      }
      else {
        console.log(err);
        this.toastr.error(err.error.message, 'Error');
        // setTimeout(() => { this.title.isLoding = true; }, 1500);
        this.title.isLoding = true;
      }
    });
  }

  goToLink(prod: Product) {
    localStorage.setItem("selectedProd", JSON.stringify(prod));
    window.open(prod.productURL);
  }

  getbooleanvalues() {
    for (var i = 0; i < this.tenantSubscribedProducts.length; i++) {
      this.productIcon[i] = this.sanitizer.bypassSecurityTrustResourceUrl(this.tenantSubscribedProducts[i].productIcon)
      this.expanded.push(false);
    }
  }

  readmore(id) {
    this.expanded[id] = true;
  }

  Readless(id) {
    this.expanded[id] = false;
  }

  select() {
    this.router.navigate(['/tenant/products/new-products']);
  }

  daysLeftMethod() {


    for (let i = 0; i < this.tenantSubscribedProducts.length; i++) {
      if (this.tenantSubscribedProducts[i].endDate != null) {
        const date: Date = new Date(this.timeFromBackEnd);
        const endDate: Date = new Date(this.tenantSubscribedProducts[i].endDate);


        if (endDate.getTime() > date.getTime()) {
          const diff = Math.abs(date.getTime() - endDate.getTime());
          const day = 1000 * 60 * 60 * 24;
          const days = Math.floor(diff / day);
          console.log("days", days);
          const diffDays = Math.ceil(diff / day);
          const years = Math.floor(diffDays / 365);
          console.log("days % years", Math.floor(years * 365));
          console.log("days % years", days - (years * 365));
          var remainingDays = days - (years * 365);
          if (remainingDays > -1)
            var rendays = remainingDays;
          else
            rendays = 0

          // const months = Math.floor(days / 31);
          this.daysLeft[i] = { "years": years, "days": rendays };
          this.buttonEnable[i] = false;
          // this.newDatesForTrial[i].setDate(this.newDatesForTrial[i].getDate() + this.ExtentionDateOfTrial[i]);
        } else {
          this.daysLeft[i] = 0;
          this.buttonEnable[i] = true;
        }
      } else {
        this.daysLeft[i] = 0;
      }
    }
    console.log(this.daysLeft);
  }

  getSelectedProd(prod: Product) {
    this.selectedProd = prod;
    this.token = this.auth.token;
    this.username = this.auth.userName;
    console.log(prod);
  }

  getDateTime() {
    this.tenantService.getDate().subscribe((res) => {
      this.timeFromBackEnd = res
    }, err => {
      console.log(err);
    })
  }

  statusDate() {
    if (this.tenantSubscribedProducts.length > 0) {
      for (let i = 0; i < this.tenantSubscribedProducts.length; i++) {
        const date: Date = new Date(this.tenantSubscribedProducts[i].startDate);
        this.newDate[i] = date;
        const num = +this.tenantSubscribedProducts[i].productDuration;
        this.newDate[i].setDate(this.newDate[i].getDate() + num);
      }
      this.buttonEnable.length = this.tenantSubscribedProducts.length;
      for (let i = 0; i < this.tenantSubscribedProducts.length; i++) {
        if (this.tenantSubscribedProducts[i].endDate != null) {
          const date: Date = new Date(this.tenantSubscribedProducts[i].endDate);
          const endDate: Date = new Date(this.newDate[i]);
          if (date.getTime() > endDate.getTime()) {
            const diff = Math.abs(date.getTime() - endDate.getTime());
            const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
            this.ExtentionDate[i] = diffDays;
            this.newDate[i].setDate(this.newDate[i].getDate() + this.ExtentionDate[i]);
          } else {
            this.ExtentionDate[i] = 0;
          }
        } else {
          this.ExtentionDate[i] = 0;
        }
      }
      for (let i = 0; i < this.tenantSubscribedProducts.length; i++) {
        const date1 = new Date(this.newDate[i]);
        const date2 = new Date(this.timeFromBackEnd);
        if (date2.getTime() > date1.getTime()) {
          this.buttonEnable[i] = true;
        } else
          this.buttonEnable[i] = false;
        const diff = Math.abs(date1.getTime() - date2.getTime());
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        this.status[i] = Math.floor(diffDays / 365);
      }
      console.log(this.status);
      console.log(this.ExtentionDate);
    }
  }
}
