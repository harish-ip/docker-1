import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Product } from 'src/app/share/model/model';
import { CartService } from 'src/app/share/service/cart.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { TenantServiceService } from 'src/app/tenant/service/tenant-service.service';
import { RegisterService } from 'src/app/share/service/register.service';

@Component({
  selector: 'app-trial-products',
  templateUrl: './trial-products.component.html',
  styleUrls: ['./trial-products.component.css']
})

export class TrialProductsComponent implements OnInit {

  trialProducts: Product[] = [];             // To get the Trail Products 
  buyProduct: Product;
  showTenantTrialProducts = false;
  newDatesForTrial = [];
  statusForTrial = [];
  product: Product;
  productName: string = "";
  productdesc = "";
  selproductId;
  selProductLicenseID;
  actualPrice;
  pImage;
  pIcon;
  pDuration;
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
  tTrialProducts: any;
  constructor(private tenantService: TenantServiceService,
    public title: PageTitleService,
    private toastr: ToastrService,
    private router: Router,
    private cart: CartService,
    private auth: AuthenticationService,
    public sanitizer: DomSanitizer,
    private register: RegisterService) { }

  ngOnInit() {
    this.title.tenantTitle = "Trial Products";
    this.getDateTime();
    this.getTrailProducts();
    this.getTrailsProdFromDashboard();
	this.pIcon = '';
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
    } else {
      this.toastr.warning("Trial period expired, please buy to continue", "Warning");
    }
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
    this.selectedSiteUser = '';
    if (this.selectedSiteAdmin.length != 0) {
      this.register.getSiteUsers(clientName, this.selectedSiteAdmin).subscribe(res => {
        console.log(res);
        this.siteUsers = res;

      }, err => {
        console.log(err);
      })
    } else
      this.siteUsers = [];
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
	this.trialProducts = [];
    this.tenantService.listOfTrialProducts().subscribe((res) => {
      
      this.tTrialProducts = res;
      this.tTrialProducts.forEach((val, i) => {
	   this.tenantService.getProducts(val['productId']).subscribe((response) => {
	    const obj = Object.assign(this.tTrialProducts[i],response);
	    obj['productName'] = response.productName;
	    obj['productIcon'] = response.productIcon;
	    obj['subscribedBy'] = response.subscribedBy;
	    obj['productDescription'] = response.productDescription;
	    this.tTrialProducts.push(obj);
	   });
      });
	  this.trialProducts = this.tTrialProducts;
      this.trialProducts = this.tTrialProducts.filter(function (a) {
       return !this[a.productId] && (this[a.productId] = true);
      }, Object.create(null));
      this.getbooleanvalues();
      if (res.length != 0) {
        // setTimeout(() => { this.daysLeftMethod(); }, 1000);
         setTimeout(() => {
              this.getDateTime();
              this.daysLeftMethod();
              this.showTenantTrialProducts = true;
            }, 200);
        
      }
      // setTimeout(() => { this.title.isLoding = true; }, 1500);
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
    this.selproductId =   prod.productId;
  }

    /**** Add to Cart Method Start *****/
  addtocart(selproductId) {
	  const username = localStorage.getItem("email");
    this.cart.addToCart(username,selproductId).subscribe((res) => {
      this.router.navigate(['/products/product-list']).then(() => {
        this.toastr.success('The product has been added to the shopping cart', 'Success');
      });
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error');
    })
  }
  /**** Add to Cart Method End *****/

  copyAssignProduct(prod: Product) {
    this.assignProduct = prod;
    this.assignProduct.subscribedBy = this.auth.decoded.sub;
    this.selproductId = prod.productId;
    this.selProductLicenseID = prod.id;
  }

  assign() {
    this.assignProduct.assignedBy = this.auth.decoded.sub;
	console.log("Assigned By :"+this.auth.decoded.sub);
    this.tenantService.assignProducts(this.selectedSiteAdmin,this.selproductId,this.selProductLicenseID).subscribe(res => {
      console.log(res);
      this.toastr.success(this.assignProduct.productName + " is assigned to " + this.selectedSiteAdmin + " successfully", 'Success');
      this.assigntoUser();
    }, err => {
      console.log(err);
      if (err.status == 409) {
        this.toastr.warning(this.assignProduct.productName + " already exits for " + this.selectedSiteAdmin, "Warning");
        this.assigntoUser();
      }
    })
  }

  assigntoUser() {
    if (this.selectedSiteUser) {
      this.tenantService.assignProducts(this.selectedSiteUser,this.selproductId,this.selProductLicenseID).subscribe(res => {
        console.log(res);
        this.toastr.success(this.assignProduct.productName + " is assigned to " + this.selectedSiteUser + " successfully", 'Success');
      }, err => {
        console.log(err);
        this.toastr.warning(this.assignProduct.productName + " already exits for " + this.selectedSiteUser, "Warning")
      })
    }
  }
   buy() {
    this.buyproductconverttonumber();
    console.log(this.buyProduct);
    this.tenantService.activateLicense(this.selproductId,'forBuy').subscribe((res) => {
      //console.log(res);
      this.toastr.success('The product has been added to the subscribed products', 'Success');
      // this.getNewProducts();
      this.router.navigate(["/clientadmin/products/subscribed-products"]);
    }, err => {
      console.log(err);
      this.buyproductconverttotext();
      this.toastr.error(err.error.message, 'Error');
    })
  }
  
  buyproductconverttonumber() {
    if (this.buyProduct.productDuration == 'year')
      this.buyProduct.productDuration = '365'
    else if (this.buyProduct.productDuration == 'month')
      this.buyProduct.productDuration = '30'
    else
      this.buyProduct.productDuration = '1095'
  }
  copyBuyProduct(prod: Product) {
    this.buyProduct = prod;
    this.productName = prod.productName;
    this.productdesc = prod.productDescription;
	this.selproductId = prod.productId;
	this.pImage = prod.productImage;
    this.pIcon = prod.productIcon;
    this.pDuration = prod.productDuration;
	//console.dir(Product);
  }
  buyproductconverttotext() {
    if (this.buyProduct.productDuration == '365')
      this.buyProduct.productDuration = 'year'
    else if (this.buyProduct.productDuration == '30')
      this.buyProduct.productDuration = 'month'
    else
      this.buyProduct.productDuration = '3 years'
  }
}
