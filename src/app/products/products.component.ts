import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

import { CartService } from 'src/app/share/service/cart.service';
import { Product } from '../share/model/model';
import { AuthenticationService } from '../share/service/authentication.service';
import { PageTitleService } from '../share/service/page-title.service';
import { DataShareService } from '../share/service/data-share.service';
import { TenantServiceService } from '../tenant/service/tenant-service.service';
import { ProductService } from '../admin/Admin-Share/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  products: Product[];
  oldItems = [];
  viewProduct: Product;
  prdname = '';
  prdimg = '';
  prddesc = '';
  prdprice = null;
  prdsubs = '';
  suitename = '';
  buyProduct: Product;
  trialProduct: Product;
  productName = "";
  productdesc = "";
  selproductId;

  productList: Product[];
  expanded: boolean;

  constructor(
    private Service: ProductService,
    private toastr: ToastrService,
    private _sanitizer: DomSanitizer,
    private cart: CartService,
    private router: Router,
    public auth: AuthenticationService,
    public title: PageTitleService,
    private dataShare: DataShareService,
    private tenantService: TenantServiceService,
  ) {
    this.dataShare.navProdChange.subscribe(() => {
      this.showProductsFromSearch();
    })
  }

  ngOnInit() {

    this.Service.productsList().subscribe((data) => {
      this.productList = data;
      setTimeout(() => { this.title.isLoding = true; }, 1000);
      console.log(this.productList);
      if (this.productList.length == 0) {
        this.toastr.warning("No products are available", "Warning");
      }
      else {
        this.trialProduct = data[0];
        this.buyProduct = data[0];
        this.prdname = data[0].productName;
        this.selproductId =   data[0].productId;
        this.prdimg = data[0].productImage;
        this.prddesc = data[0].productDescription;
        this.prdprice = data[0].productPrice;
        this.suitename = data[0].suiteName;
        if (data[0].productDuration == '30')
          this.prdsubs = 'month';
        else if (data[0].productDuration == '365')
          this.prdsubs = 'year';
        else if (data[0].productDuration == '1095')
          this.prdsubs = '3 years';
      }
    },
      err => {
        setTimeout(() => { this.title.isLoding = true; }, 1000);
        this.toastr.error('Server is not responding', 'Error');
        console.log(err);
      }
    );

    this.dataShare.navProdChange.subscribe(() => {
      this.showProductsFromSearch();
    })

  }

  showProductsFromSearch() {
    console.log(this.dataShare.productsSearch);
    if (this.dataShare.productsSearch) {
      this.buyProduct = this.dataShare.productsSearch[0];
      this.trialProduct = this.dataShare.productsSearch[0];
      this.prdname = this.dataShare.productsSearch[0].productName;
      this.prdimg = this.dataShare.productsSearch[0].productImage;
      this.prddesc = this.dataShare.productsSearch[0].productDescription;
      this.prdprice = this.dataShare.productsSearch[0].productPrice;
      this.suitename = this.dataShare.productsSearch[0].suiteName;
      this.selproductId =   this.dataShare.productsSearch[0].productId;
      if (this.dataShare.productsSearch[0].productDuration == '30')
        this.prdsubs = 'month';
      else if (this.dataShare.productsSearch[0].productDuration == '365')
        this.prdsubs = 'year';
      else if (this.dataShare.productsSearch[0].productDuration == '1095')
        this.prdsubs = '3 years';
    }
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${image})`);
  }

  // From intital product display
  copyBuyProductsingle(prdname, prddesc) {
    this.productName = prdname;
    this.productdesc = prddesc;
  }

  // From intital product display
  copytrialProdsingle(prdname, prddesc) {
    this.productName = prdname;
    this.productdesc = prddesc;
  }

  tryproductconverttonumber() {
    if (this.trialProduct.productDuration == 'month')
      this.trialProduct.productDuration = '30';
    else if (this.trialProduct.productDuration == 'year')
      this.trialProduct.productDuration = '365';
    else if (this.trialProduct.productDuration == '3 years')
      this.trialProduct.productDuration = '1095';
  }

  tryproductconverttotext() {
    if (this.trialProduct.productDuration == '365')
      this.trialProduct.productDuration = 'year'
    else if (this.trialProduct.productDuration == '30')
      this.trialProduct.productDuration = 'month'
    else if (this.trialProduct.productDuration == '1095')
      this.trialProduct.productDuration = '3 years'
  }

  trial() {
    console.log(this.trialProduct);
    this.tryproductconverttonumber();

    this.trialProduct.trial = true;
    this.tenantService.addToTrial([this.trialProduct]).subscribe((res) => {
      console.log(res);
      this.toastr.success('The product has been added to the trial products', 'Success');
      this.router.navigate(["tenant/dashboard/trialProducts"]);
    }, err => {
      this.tryproductconverttotext();
      console.log(err);
      if (err.status === 500) {
        this.toastr.warning(err.error.message, 'Warning');
      }
    })

  }

  buyproductconverttonumber() {
    if (this.buyProduct.productDuration == 'year')
      this.buyProduct.productDuration = '365'
    else if (this.buyProduct.productDuration == 'month')
      this.buyProduct.productDuration = '30'
    else if (this.buyProduct.productDuration == '3 years')
      this.buyProduct.productDuration = '1095'
  }

  buyproductconverttotext() {
    if (this.buyProduct.productDuration == '365')
      this.buyProduct.productDuration = 'year'
    else if (this.buyProduct.productDuration == '30')
      this.buyProduct.productDuration = 'month'
    else if (this.buyProduct.productDuration == '1095')
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

  ViewProduct(product: Product) {
    console.log(product);
    this.viewProduct = product;
    this.buyProduct = product;
    this.trialProduct = product;
    this.prdname = product.productName;
    this.prdimg = product.productImage;
    this.prddesc = product.productDescription;
    this.prdprice = product.productPrice;
    this.suitename = product.suiteName;
    if (product.productDuration == 'month')
      this.prdsubs = 'month';
    else if (product.productDuration == 'year')
      this.prdsubs = 'year';
    else if (product.productDuration == '3 years')
      this.prdsubs = '3 year';
  }

}
