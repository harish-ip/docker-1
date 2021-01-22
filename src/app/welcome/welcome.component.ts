import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

import { Product } from '../share/model/model';
import { CartService } from '../share/service/cart.service';
import { DataShareService } from '../share/service/data-share.service';
import { PageTitleService } from '../share/service/page-title.service';
import { AuthenticationService } from '../share/service/authentication.service';
import { ProductService } from '../admin/Admin-Share/product.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  productList: Product[];
  buyProduct: Product;
  productdetail: Product;
  productName = "";
  productdesc = "";
  selproductId;
  expanded = [];
  productIcon = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cart: CartService,
    private _sanitizer: DomSanitizer,
    private dataShare: DataShareService,
    public title: PageTitleService,
    public auth: AuthenticationService,
    private prdservice: ProductService) {
  }

  ngOnInit() {
    if (this.dataShare.welcomeShowInitial) {
      this.title.isLoding = false;
      this.prdservice.productsList().subscribe((data) => {
        this.productList = data;
        setTimeout(() => { this.title.isLoding = true; }, 1000);
        this.dataShare.welcomeProducts = data;
        console.log(this.productList);
        this.dataShare.welcomeShowInitial = false;
        if (this.productList.length == 0) {
          this.toastr.warning("No products are available", "Warning");
        }

        /* if (this.productList.length != 0) {
          for (var i = 0; i < this.productList.length; i++) {
            if (data[i].productDuration == '30')
              data[i].productDuration = 'month';
            else if (data[i].productDuration == '365')
              data[i].productDuration = 'year';
            else if (data[i].productDuration == '1095')
              data[i].productDuration = '3 years';
          }
        } */

        this.getproducticons();

      },
        err => {

          setTimeout(() => { this.title.isLoding = true; }, 1000);
          this.toastr.warning(err.error.message, 'warning');
          console.log(err);
        }
      );
    }
    this.productList = this.dataShare.welcomeProducts;
  }

  getproducticons() {
    for (var i = 0; i < this.productList.length; i++) {
      this.productIcon[i] = this._sanitizer.bypassSecurityTrustResourceUrl(this.productList[i].productIcon)
    }
  }

  copyBuyProduct(prod: Product) {
    this.buyProduct = prod;
    this.productName = prod.productName;
    this.productdesc = prod.productDescription;
    this.selproductId =   prod.productId;
  }

  copyproductdetail(prod: Product) {

    if (this.auth.islogin && (this.auth.rolebase == 'ROLE_USER')) {
      this.productdetail = prod;
      localStorage.setItem('product', JSON.stringify(prod));
      this.dataShare.productsdetail = this.productdetail;
      this.router.navigate(['/tenant/products/productdetail']);
    } else if (this.auth.islogin && (this.auth.rolebase == 'ROLE_SITE_USER')) {
      this.productdetail = prod;
      localStorage.setItem('product', JSON.stringify(prod));
      this.dataShare.productsdetail = this.productdetail;
      this.router.navigate(['/tenant/products/productdetail']);
    } else if (this.auth.islogin && this.auth.rolebase == ('ROLE_CLIENT_MASTER')) {
      this.productdetail = prod;
      localStorage.setItem('product', JSON.stringify(prod));
      this.dataShare.productsdetail = this.productdetail;
      this.router.navigate(['/clientadmin/products/product-details']);
    } else if (this.auth.islogin && this.auth.rolebase == ('ROLE_SITE_ADMIN')) {
      this.productdetail = prod;
      localStorage.setItem('product', JSON.stringify(prod));
      this.dataShare.productsdetail = this.productdetail;
      this.router.navigate(['/siteadmin/products/products-details']);
    }
    else {
      this.toastr.warning('Please sign in to access the product details', 'Warning')
    }
  }

  /* buyproductconverttonumber() {
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
  } */

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