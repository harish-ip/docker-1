import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/share/model/model';
import { TenantServiceService } from '../../service/tenant-service.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { CartService } from 'src/app/share/service/cart.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})

export class NewProductsComponent implements OnInit {
  newProducts: Product[] = [];               // To get the New Products - Not yet subscribed
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
  p = 1;
  expanded: boolean[] = [];
  productIcon = [];

  constructor(private tenantService: TenantServiceService,
    public title: PageTitleService,
    private router: Router,
    private cart: CartService,
    private toastr: ToastrService,
    public sanitizer: DomSanitizer,
    private auth: AuthenticationService) { }

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
      this.title.isLoding = true;
      if (this.newProducts.length != 0) {
        for (var i = 0; i < this.newProducts.length; i++) {
          if (res[i].productDuration == '30')
            res[i].productDuration = 'month';
          else if (res[i].productDuration == '365')
            res[i].productDuration = 'year';
          else if (res[i].productDuration == '1095')
            res[i].productDuration = '3 years';
        }
        this.getbooleanvalues();
      }

    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error');
      // setTimeout(() => { this.title.isLoding = true; }, 1000);
      this.title.isLoding = true;
    });
  }

  getbooleanvalues() {
    for (var i = 0; i < this.newProducts.length; i++) {
      this.productIcon[i] = this.sanitizer.bypassSecurityTrustResourceUrl(this.newProducts[i].productIcon)
      this.expanded.push(false);
    }
  }

  readmore(id) {
    this.expanded[id] = true;
  }

  Readless(id) {
    this.expanded[id] = false;
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

   buy() {
    this.buyproductconverttonumber();
    console.log(this.buyProduct);
    this.tenantService.activateLicense(this.selproductId,'forBuy').subscribe((res) => {
      //console.log(res);
      this.toastr.success('The product has been added to the subscribed products', 'Success');
      // this.getNewProducts();
      this.router.navigate(["/tenant/products/subscribed-products"]);
    }, err => {
      console.log(err);
      this.buyproductconverttotext();
      this.toastr.error(err.error.message, 'Error');
    })
  }

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
    this.tenantService.activateLicense(this.selproductId,'forTrail').subscribe((res) => {
      console.log(res);
      this.toastr.success('The product has been added to the trial products', 'Success');
      // this.getNewProducts();
      this.router.navigate(["tenant/products/trial-products"]);
    }, err => {
      this.tryproductconverttotext();
      if (err.status === 500) {
        this.toastr.warning(err.error.message, 'Warning');
      }
      console.log(err);
    })
  }

}

