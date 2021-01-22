import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Product } from 'src/app/share/model/model';
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

  trialProducts: Product[] = [];  // To get the Trail Products
  assignedProd: Product[] = [];
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
  p = 1;
  selproductId;
  selProductLicenseID;
  tSubscribedProducts: any;
  constructor(private tenantService: TenantServiceService,
    public title: PageTitleService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    public sanitizer: DomSanitizer,
    private register: RegisterService,
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
  });
      this.assignedProd = this.tSubscribedProducts;
	  this.assignedProd = this.tSubscribedProducts.filter(function (a) {
    return !this[a.productId] && (this[a.productId] = true);
  }, Object.create(null));
      console.log("assignedProd", this.assignedProd);
      this.trialProducts = [];
      if(this.assignedProd != null){
        this.assignedProd.filter(a => {
          if (a.assignedBy != null) {
            if (a.assignedBy == this.dataShare.userdetails.value.clientmaster) {
              this.trialProducts.push(a);
            }
          }
        })
      }
      console.log(this.trialProducts.length);
      this.getbooleanvalues();
      if (this.trialProducts.length != 0) {
        this.daysLeftMethod();
        this.showTenantTrialProducts = true;
      }
      this.title.isLoding = true;
    }, err => {
      if (err.status == 417) {
        console.log(err);
        this.toastr.warning(`No assigned products for this user ${this.auth.userName}`, 'Warning');
        this.title.isLoding = true;
      }
      else {
        console.log(err);
        this.toastr.error(err.error.message, 'Error');
        this.title.isLoding = true;
      }
    })
  }

  daysLeftMethod() {
    for (let i = 0; i < this.trialProducts.length; i++) {
      if (this.trialProducts[i].endDate != null) {
        const date: Date = new Date(this.trialProducts[i].startDate);
        const endDate: Date = new Date(this.trialProducts[i].endDate);
        if (endDate.getTime() > date.getTime()) {
          const diff = Math.abs(date.getTime() - endDate.getTime());
          const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          this.daysLeft[i] = diffDays;
          // this.newDatesForTrial[i].setDate(this.newDatesForTrial[i].getDate() + this.ExtentionDateOfTrial[i]);
        } else {
          this.daysLeft[i] = 0;
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
    this.selproductId = prod.productId;
  }

  // buy() {
  //   let prods: Product[] = this.cart.products;
  //   const user = this.auth.decoded.sub;
  //   this.product.trial = false;
  //   // const decoded = this.auth.getDecodedToken();
  //   this.cart.addToCart([this.product]).subscribe((res) => {
  //     this.product = null;
  //     this.router.navigate(['/viewcart']).then(() => {
  //       this.toastr.success('The product has been added to the shopping cart', 'Success');
  //     });
  //   }, err => {
  //     console.log(err);
  //     this.toastr.warning(err.error.message, 'Warning');
  //   })
  // }

  copyAssignProduct(prod: Product) {
    this.assignProduct = prod;
    this.selproductId = prod.productId;
    this.selProductLicenseID = prod.id;
  }

  getSiteUsers() {
    console.log(this.selectedSiteAdmin);
    const siteAdmin = this.auth.decoded.sub;
    const clientName = this.dataShare.userdetails.value.clientmaster
    this.register.getSiteUsers(clientName, siteAdmin).subscribe(res => {
      console.log(res);
      this.siteUsers = res;
    }, err => {
      console.log(err);
    })
  }

  assigntoUser() {
    this.assignProduct.assignedBy = this.auth.decoded.sub;
    this.tenantService.assignProducts(this.selectedSiteUser,this.selproductId,this.selProductLicenseID).subscribe(res => {
      console.log(res);
      this.toastr.success(this.assignProduct.productName + " is assigned to " + this.selectedSiteUser + " successfully", 'Success');
    }, err => {
      console.log(err);
      this.toastr.error(this.assignProduct.productName + " already exits for " + this.selectedSiteUser, "Error");
    })
  }

}
