import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Product } from 'src/app/share/model/model';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { Router } from '@angular/router';
import { TenantServiceService } from 'src/app/tenant/service/tenant-service.service';
import { RegisterService } from 'src/app/share/service/register.service';

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
  siteAdmins = [];
  siteUsers = [];
  selectedSiteAdmin: string = '';
  selectedSiteUser: string = '';
  assignProduct: Product = null;
  p = 1;
  selproductId;
  selProductLicenseID;
  selProdName;
  constructor(private tenantService: TenantServiceService,
    public title: PageTitleService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private register: RegisterService) { }

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
        this.tenantSubscribedProducts = res['uniqueProducts'];
        if (this.tenantSubscribedProducts) {
          if (this.tenantSubscribedProducts.length != 0) {
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
      }
      else {
        console.log(err);
        this.toastr.error(err.error.message, 'Error');
        this.title.isLoding = true;
      }
    });
  }

  goToLink(prod: Product, index) {
    localStorage.setItem("selectedProd", JSON.stringify(prod));
    if (this.daysLeft[index] != 0) {
      window.open(prod.productURL);
    }
  }


  /*  goToLink(prod: Product, index: number) {
     localStorage.setItem("selectedProd", JSON.stringify(prod));
     if (this.daysLeft[index] != 0) {
       window.open(prod.productURL);
     } else {
       this.toastr.warning("Buy period expired, please buy to continue", "Warning");
     }
   } */
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
    this.router.navigate(['/clientadmin/products']);
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
    this.selproductId = prod.productId;
    console.log(prod);
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
	  console.dir(prod);
    this.assignProduct = prod;
    this.selproductId = prod.productId;
    this.selProductLicenseID = prod.id;
	this.selProdName = prod.productName;
  }

  getSiteAdmins() {
    const clientName = this.auth.decoded.sub;
    this.register.getSiteAdmins(clientName).subscribe(res => {
      console.log(res);
      this.siteAdmins = res;
    }, err => {
      console.log(err);
    })
  }

  getSiteUsers() {
    console.log(this.selectedSiteAdmin);
    const clientName = this.auth.decoded.sub;
    if (this.selectedSiteAdmin.length != 0) {
      this.register.getSiteUsers(clientName, this.selectedSiteAdmin).subscribe(res => {
        console.log(res);
        this.siteUsers = res;
      }, err => {
        console.log(err);
      })
    }
  }

  assign() {
    this.assignProduct.assignedBy = this.auth.decoded.sub;
    console.log(this.assignProduct);
    this.tenantService.assignProducts(this.selectedSiteAdmin,this.selproductId,this.selProductLicenseID).subscribe(res => {
      console.log(res);
      this.toastr.success(this.selProdName + " is assigned to " + this.selectedSiteAdmin + " successfully", 'Success');
      this.assigntoUser();
    }, err => {
      console.log(err);
      if (err.status == 409) {
        this.toastr.warning(this.selProdName + " already exits for " + this.selectedSiteAdmin, "Warning");
        this.assigntoUser();
      }
    },
      () => this.clear())
  }

  assigntoUser() {
    if (this.selectedSiteUser) {
      this.tenantService.assignProducts(this.selectedSiteUser,this.selproductId,this.selProductLicenseID).subscribe(res => {
        console.log(res);
        this.toastr.success(this.selProdName + " is assigned to " + this.selectedSiteUser + " successfully", 'Success');
      }, err => {
        console.log(err);
        this.toastr.error("This product already exits for " + this.selectedSiteUser, "Error")
      },
        () => this.clear())
    }
  }
}
