import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TenantServiceService } from '../../service/tenant-service.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Product } from 'src/app/share/model/model';
import { CartService } from 'src/app/share/service/cart.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'app-trial-products',
  templateUrl: './trial-products.component.html',
  styleUrls: ['./trial-products.component.css']
})

export class TrialProductsComponent implements OnInit {

  trialProducts: Product[] = [];             // To get the Trail Products 
  showTenantTrialProducts = false;
  newDatesForTrial = [];
  statusForTrial = [];
  product: Product;
  productName: string = "";
  productdesc = "";
  selproductId;
  actualPrice;
  discountedPrice;
  couponSuccessdiv = false;
  couponFailurediv = false;
  couponErrMsg;
  timeFromBackEnd: string = null;
  ExtentionDateOfTrial: number[] = [];
  applycouponbtn = false;

  constructor(private tenantService: TenantServiceService,
    public title: PageTitleService,
    private toastr: ToastrService,
    private router: Router,
    private cart: CartService,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.title.tenantTitle = "Trial Products";
    // console.log(this.trialProducts.length);
    this.getDateTime();
    this.getTrailProducts();
  }


  goToLink(prod: Product) {
    localStorage.setItem("selectedProd", JSON.stringify(prod));
    window.open("tenant/loadApp");
  }

  getDateTime() {
    this.tenantService.getDate().subscribe((res) => {
      this.timeFromBackEnd = res
    }, err => {
      console.log(err);
    })
  }

  getTrailProducts() {
    this.title.isLoding = false;
    this.tenantService.listOfTrialProducts().subscribe((res) => {
      console.log(res);
      this.trialProducts = null;
      this.trialProducts = res['uniqueProducts'];
      console.log(this.trialProducts);
      if (this.trialProducts) {
        // setTimeout(() => { this.statusDateForTrailProducts(); }, 1000);
        this.statusDateForTrailProducts();
        this.showTenantTrialProducts = true;
      }
      // setTimeout(() => { this.title.isLoding = true; }, 1500);
      this.title.isLoding = true;
    }, err => {
      if (err.status == 417) {
        console.log(err);
        this.toastr.warning(`No trial products for this tenant ${this.auth.userName}`, 'Warning');
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

  statusDateForTrailProducts() {
    if (this.trialProducts.length !== 0) {
      for (let i = 0; i < this.trialProducts.length; i++) {
        const endDate = new Date(this.trialProducts[i].endDate);
        const currentDateFromBackEnd = new Date(this.timeFromBackEnd);
        if (endDate.getTime() > currentDateFromBackEnd.getTime()) {
          const diff = Math.abs(endDate.getTime() - currentDateFromBackEnd.getTime());
          const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          this.statusForTrial[i] = diffDays;
        } else {
          this.statusForTrial[i] = 0;
        }
      }
    }
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

}
