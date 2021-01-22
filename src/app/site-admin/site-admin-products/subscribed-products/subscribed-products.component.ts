import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Product } from 'src/app/share/model/model';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TenantServiceService } from 'src/app/tenant/service/tenant-service.service';
import { RegisterService } from 'src/app/share/service/register.service';
import { DataShareService } from 'src/app/share/service/data-share.service';

@Component({
  selector: 'app-subscribed-products',
  templateUrl: './subscribed-products.component.html',
  styleUrls: ['./subscribed-products.component.css']
})

export class SubscribedProductsComponent implements OnInit {

  tenantSubscribedProducts: Product[] = [];  // To get the Subscribed Products
  timeFromBackEnd: string = null;
  showSubscribedProducts = false;
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
  siteAdmins = [];
  siteUsers = [];
  selectedSiteAdmin: string = '';
  selectedSiteUser: string = '';
  assignProduct: Product = null;
  p = 1;
  selproductId;
  selProductLicenseID;
  tSubscribedProducts: any;
  constructor(private tenantService: TenantServiceService,
    public title: PageTitleService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private register: RegisterService,
    private dataShare: DataShareService) { }

  ngOnInit() {
    this.title.tenantTitle = "Subscribed Products";
    this.getDateTime();
    this.getSubscribedProducts();
  }

getSubscribedProducts() {
 this.title.isLoding = false;
 this.tenantService.tenantProducts().subscribe((res) => {
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
  this.tenantSubscribedProducts = this.tSubscribedProducts;
  this.tenantSubscribedProducts = this.tSubscribedProducts.filter(function (a) {
    return !this[a.productId] && (this[a.productId] = true);
  }, Object.create(null));
  console.dir(this.tenantSubscribedProducts);
  if (res) {
    if (res.length != 0) {
     this.getDateTime();
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
  this.title.isLoding = true;
 } else {
  console.log(err);
  this.toastr.error(err.error.message, 'Error');
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
    this.router.navigate(['/siteadmin/products']);
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
  }

  getDateTime() {
    this.tenantService.getDate().subscribe((res) => {
      this.timeFromBackEnd = res
    }, err => {
      console.log(err);
    })
  }

  clear() {
    this.selectedSiteAdmin = '';
    this.selectedSiteUser = '';
    this.assignProduct = null;
  }

  copyAssignProduct(prod: Product) {
    this.assignProduct = prod;
    this.selproductId = prod.productId;
    this.selProductLicenseID = prod.id;
  }

  getSiteUsers() {
    console.log(this.selectedSiteAdmin);
    const clientName = this.dataShare.userdetails.value.clientmaster;
    const siteAdmin = this.auth.decoded.sub;
    this.register.getSiteUsers(clientName, siteAdmin).subscribe(res => {
      console.log(res);
      this.siteUsers = res;
    }, err => {
      console.log(err);
    })
  }

  assigntoUser() {
    console.log(this.selectedSiteUser);
    console.log(this.assignProduct);
    this.assignProduct.assignedBy = this.auth.decoded.sub;
    this.tenantService.assignProducts(this.selectedSiteUser,this.selproductId,this.selProductLicenseID).subscribe(res => {
      console.log(res);
      this.toastr.success(this.assignProduct.productName + " is assigned to " + this.selectedSiteUser + " successfully", 'Success');
    }, err => {
      console.log(err);
      this.toastr.error("This product already exits for " + this.selectedSiteUser, "Error")
    })
  }
}
