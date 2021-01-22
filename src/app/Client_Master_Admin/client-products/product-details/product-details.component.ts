import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/share/model/model';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { CartService } from 'src/app/share/service/cart.service';
import { TenantServiceService } from 'src/app/tenant/service/tenant-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  Product: Product;
  productIcon;
  buyProduct: Product;
  productName = "";
  productdesc = "";
  trialProduct: Product;
  selproductId;
  constructor(public datashare: DataShareService,
    private cart: CartService,
    private tenantService: TenantServiceService,
    public _sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthenticationService) {
    this.datashare.samePageInProd.subscribe(val => {
      if (datashare.samePageInProd.value) {
        this.getsearchproductdata();
        datashare.samePageInProd.next(false);
      }
    })
  }

  ngOnInit() {
    this.getsearchproductdata();
  }

  getsearchproductdata() {
    console.clear();
    console.log(this.datashare.productsdetail);
    this.Product = this.datashare.productsdetail;
    this.productIcon = this._sanitizer.bypassSecurityTrustResourceUrl(this.Product.productIcon);
    console.log(this.productIcon);
  }
  copyBuyProduct(prod: Product) {
    this.buyProduct = prod;
    this.productName = prod.productName;
    this.productdesc = prod.productDescription;
    this.selproductId =   prod.productId;
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
    else if (this.trialProduct.productDuration == '30')
      this.trialProduct.productDuration = 'month'
    else
      this.trialProduct.productDuration = '3 years'
  }

  trial() {
    this.trialProduct.trial = true;
    this.trialProduct.subscribedBy = this.auth.decoded.sub;
    this.tryproductconverttonumber();
    console.log(this.trialProduct);

    // const user = this.auth.getDecodedToken();
    this.tenantService.activateLicense([this.trialProduct],'forTrail').subscribe((res) => {
      console.log(res);
      this.toastr.success('The product has been added to the trial products', 'Success');
      // this.getNewProducts();
      this.router.navigate(["clientadmin/products/trial-products"]);
    }, err => {
      this.tryproductconverttotext();
      if (err.status === 500) {
        this.toastr.warning(err.error.message, 'Warning');
      }
      console.log(err);
    })
  }

}
