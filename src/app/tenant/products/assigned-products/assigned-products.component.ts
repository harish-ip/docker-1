import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Product } from 'src/app/share/model/model';
import { CartService } from 'src/app/share/service/cart.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TenantServiceService } from 'src/app/tenant/service/tenant-service.service';
import { RegisterService } from 'src/app/share/service/register.service';
import { DataShareService } from 'src/app/share/service/data-share.service';

@Component({
  selector: 'app-assigned-products',
  templateUrl: './assigned-products.component.html',
  styleUrls: ['./assigned-products.component.css']
})
export class AssignedProductsComponent implements OnInit {

  trialProducts: Product[] = [];             // To get the Trail Products 
  assignedProd: Product[] = [];
  tSubscribedProducts: any;
  showTenantTrialProducts = false;
  newDatesForTrial = [];
  statusForTrial = [];
  product: Product;
  productName: string = "";
  productdesc = "";
  actualPrice;
  discountedPrice;
  couponSuccessdiv = false;
  couponFailurediv = false;
  couponErrMsg;
  timeFromBackEnd: string = null;
  ExtentionDateOfTrial: number[] = [];
  applycouponbtn = false;
  daysLeft = [];
  expanded: boolean[] = [];
  productIcon = [];
  siteAdmins = [];
  siteUsers = [];
  selectedSiteAdmin: string = '';
  selectedSiteUser: string = '';
  assignProduct: Product = null;
  buttonEnable: boolean[] = [];

  constructor(private tenantService: TenantServiceService,
    public title: PageTitleService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    public sanitizer: DomSanitizer,
    private dataShare: DataShareService) { }

  ngOnInit() {
    this.title.tenantTitle = "Trial Products";
    this.getDateTime();
    this.getTrailProducts();
    this.getTrailsProdFromDashboard();
  }

  getbooleanvalues() {
    for (var i = 0; i < this.trialProducts.length; i++) {
      this.productIcon[i] = this.sanitizer.bypassSecurityTrustResourceUrl(this.trialProducts[i].productIcon)
      this.expanded.push(false);
    }
    console.log(this.productIcon);
  }

  readmore(id) {
    this.expanded[id] = true;
  }

  Readless(id) {
    this.expanded[id] = false;
  }


  goToLink(prod: Product, index: number) {
    localStorage.setItem("selectedProd", JSON.stringify(prod));
    if (this.daysLeft[index] != 0) {
      window.open(prod.productURL);
    }
  }

  clear() {
    this.selectedSiteAdmin = '';
    this.selectedSiteUser = '';
    this.assignProduct = null;
  }

  getDateTime() {
    console.log(this.trialProducts.length);
    this.tenantService.getDate().subscribe((res) => {
      this.timeFromBackEnd = res
    }, err => {
      console.log(err);
    })
  }

  getTrailsProdFromDashboard() {
    this.tenantService.trialProdInDash.subscribe(() => {
      if (this.tenantService.trialProdInDash.value) {
        this.tenantService.trialProdInDash.next(false);
        this.getTrailProducts();
      }
    })
  }

  getTrailProducts() {
    this.title.isLoding = false;
    this.tenantService.getAssignedProducts().subscribe((res) => {
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
  })

/*           if (a.assignedBy != null) { */
              this.trialProducts = this.tSubscribedProducts;
	  this.trialProducts = this.tSubscribedProducts.filter(function (a) {
    return !this[a.productId] && (this[a.productId] = true);
  }, Object.create(null));
         /*  } */
        
      console.log(this.trialProducts);
      console.log(this.trialProducts.length);
      this.getbooleanvalues();
      if (res.length != 0) {
        this.daysLeftMethod();
        this.showTenantTrialProducts = true;
      }
      this.title.isLoding = true;
    }, err => {
      if (err.status == 417) {
        console.log(err);
        this.toastr.warning(`No trial products for this user ${this.auth.userName}`, 'Warning');
        // setTimeout(() => { this.title.isLoding = true; }, 1500);
        this.title.isLoding = true;
      }
      else {
        console.log(err);
        this.toastr.error(err.error.message, 'Error');
        // setTimeout(() => { this.title.isLoding = true; }, 1500);
        this.title.isLoding = true;
      }
    })
  }

  daysLeftMethod() {


    for (let i = 0; i < this.trialProducts.length; i++) {
      if (this.trialProducts[i].endDate != null) {
        const date: Date = new Date(this.timeFromBackEnd);
        const endDate: Date = new Date(this.trialProducts[i].endDate);
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

  copyProduct(prod: Product) {
    this.product = prod;
    this.productName = prod.productName;
    this.productdesc = prod.productDescription;
  }

}
