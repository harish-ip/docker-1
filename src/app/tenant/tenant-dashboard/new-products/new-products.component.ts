import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/share/model/model';
import { TenantServiceService } from '../../service/tenant-service.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { CartService } from 'src/app/share/service/cart.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})

export class NewProductsComponent implements OnInit {

  newProducts: Product[];               // To get the New Products - Not yet subscribed
  buyProduct: Product;
  trialProduct: Product;
  productName = "";
  productdesc = "";
  selproductId;
  actualPrice;
  discountedPrice;
  couponSuccessdiv = false;
  couponFailurediv = false;
  applycouponbtn = false;
  couponErrMsg;

  constructor(private tenantService: TenantServiceService,
    public title: PageTitleService,
    private router: Router,
    private cart: CartService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.title.tenantTitle = "New Products - Not Yet Subscribed";
    this.getNewProducts();
  }

  getNewProducts() {
    this.title.isLoding = false;
    this.tenantService.productsList().subscribe(res => {
      // setTimeout(() => { this.title.isLoding = true; }, 1000);
      this.newProducts = res;
      console.dir(this.newProducts);

      if (this.newProducts.length != 0) {
        for (var i = 0; i < this.newProducts.length; i++) {
          if (res[i].productDuration == '30')
            res[i].productDuration = 'month';
          else if (res[i].productDuration == '365')
            res[i].productDuration = 'year';
          else
            res[i].productDuration = '3 years';
        }
      }
      this.title.isLoding = true;
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error');
      // setTimeout(() => { this.title.isLoding = true; }, 1000);
      this.title.isLoding = true;
    });
  }

  /*   clear() {
      this.couponErrMsg = '';
      this.couponSuccessdiv = false;
      this.couponFailurediv = false;
      ((document.getElementById("code") as HTMLInputElement).value) = ''
      this.applycouponbtn = false;
    } */

  /*   formatecoupon() {
      var couponcode = ((document.getElementById("code") as HTMLInputElement));
      var index = couponcode.value.lastIndexOf('-');
      var test = couponcode.value.substr(index + 1);
      if (test.length === 4 && couponcode.value.length <= 10) {
        couponcode.value = couponcode.value + '-';
      }
    } */

  copyBuyProduct(prod: Product) {
    this.buyProduct = prod;
    this.productName = prod.productName;
    this.productdesc = prod.productDescription;
  }

  buyproductconverttonumber() {
    if (this.buyProduct.productDuration == 'year')
      this.buyProduct.productDuration = '365'
    else if (this.buyProduct.productDuration == 'month')
      this.buyProduct.productDuration = '30'
    else
      this.buyProduct.productDuration = '1095'
  }

  buyproductconverttotext() {
    if (this.buyProduct.productDuration == '365')
      this.buyProduct.productDuration = 'year'
    else if (this.buyProduct.productDuration == '30')
      this.buyProduct.productDuration = 'month'
    else
      this.buyProduct.productDuration = '3 years'
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
      this.buyproductconverttotext();
      this.toastr.error(err.error.message, 'Error');
    })
  }
  /**** Add to Cart Method End *****/

  copytrialProd(prod: Product) {
    this.trialProduct = prod;
    this.productName = prod.productName;
    this.productdesc = prod.productDescription;
    this.selproductId =   prod.productId;
  }


  tryproductconverttonumber() {
    if (this.trialProduct.productDuration == 'year')
      this.trialProduct.productDuration = '365'
    else if (this.trialProduct.productDuration == 'month')
      this.trialProduct.productDuration = '30'
    else
      this.trialProduct.productDuration = '1095'
  }

  tryproductconverttotext() {
    if (this.trialProduct.productDuration == '365')
      this.trialProduct.productDuration = 'year'
    else if (this.trialProduct.productDuration == '365')
      this.trialProduct.productDuration = 'month'
    else
      this.trialProduct.productDuration = '3 years'
  }

  trial() {
    this.trialProduct.trial = true;
    this.tryproductconverttonumber();
    console.log(this.trialProduct);

    this.tenantService.activateLicense([this.trialProduct],'forTrail').subscribe((res) => {
      console.log(res);
      this.toastr.success('The product has been added to the trial products', 'Success');
      // this.getNewProducts();
      this.router.navigate(["tenant/dashboard/trialProducts"]);
    }, err => {
      this.tryproductconverttotext();
      if (err.status === 500) {
        this.toastr.warning(err.error.message, 'Warning');
      }
      console.log(err);
    })
  }

  applycoupon() {

    var couponcode = ((document.getElementById("code") as HTMLInputElement).value);
    console.log(couponcode);
    console.log(this.buyProduct);
    this.actualPrice = this.buyProduct.productPrice;
    console.log(this.actualPrice);

    if (couponcode) {
      this.tenantService.applycoupon(this.buyProduct, couponcode).subscribe((res) => {
        console.log(res);
        this.discountedPrice = res['productPrice'];
        console.log(this.discountedPrice);
        this.buyProduct.productPrice = this.discountedPrice;
        console.log(this.buyProduct);
        this.couponSuccessdiv = true;
        this.couponFailurediv = false;
        this.applycouponbtn = true;
      },
        err => {
          if (err.status === 500 && err.error.message === "500 null") {
            this.couponErrMsg = 'Coupon code is invalid';
            this.couponFailurediv = true;
            this.couponSuccessdiv = false;
            this.applycouponbtn = false;
          }
          else if (err.status === 500) {
            this.couponErrMsg = err.error.message;
            this.couponFailurediv = true;
            this.couponSuccessdiv = false;
            this.applycouponbtn = false;
          }
        })
    }
    else {
      this.couponErrMsg = 'Coupon code is required';
      this.couponFailurediv = true;
      this.couponSuccessdiv = false;
      this.applycouponbtn = false;
    }

  }

}

