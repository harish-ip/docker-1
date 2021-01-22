import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/share/model/model';
import { TenantServiceService } from 'src/app/tenant/service/tenant-service.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/share/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  newProducts: Product[] = [];               // To get the New Products - Not yet subscribed
  buyProduct: Product;
  trialProduct: Product;
  productName = "";
  selproductId;
  productdesc = "";
  pImage;
  pIcon;
  pDuration;
  actualPrice;
  discountedPrice;
  couponSuccessdiv = false;
  couponFailurediv = false;
  applycouponbtn = false;
  couponErrMsg;
  p = 1;
  expanded: boolean[] = [];
  productIcon = [];
  selUsername;
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
	this.pIcon = '';
  }

  getNewProducts() {
    this.title.isLoding = false;
    this.tenantService.productsList().subscribe(res => {
      this.newProducts = res;
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
      this.title.isLoding = true;

    }, err => {
      console.log(err);
      this.toastr.error("No products are available", 'Error');

      // setTimeout(() => { this.title.isLoding = true; }, 1000);
      this.title.isLoding = true;
    });
  }

  getbooleanvalues() {
	for (var i = 0; i < this.newProducts.length; i++) {
      this.productIcon[i] = this.sanitizer.bypassSecurityTrustResourceUrl(this.newProducts[i].productIcon);
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
	this.selproductId = prod.productId;
	this.pImage = prod.productImage;
    this.pIcon = prod.productIcon;
    this.pDuration = prod.productDuration;
	//console.dir(Product);
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
      // this.router.navigate(['/products/product-list']).then(() => {
      // });
      this.toastr.success('The product has been added to the shopping cart', 'Success');
    }, err => {
      console.log(err);
      const errmsg = JSON.parse(err.error);

      this.buyproductconverttotext();
      this.toastr.error(errmsg.message, 'Error');
    })
  }
  /**** Add to Cart Method End *****/
  copytrialProd(prod: Product) {
    this.trialProduct = prod;
    this.productName = prod.productName;
    this.productdesc = prod.productDescription;
	this.selproductId = prod.productId;
	this.pImage = prod.productImage;
    this.pIcon = prod.productIcon;
    this.pDuration = prod.productDuration;
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
    this.tenantService.activateLicense(this.selproductId,'forTrail').subscribe((res) => {
      //console.log(res);
      this.toastr.success('The product has been added to the trial products', 'Success');
      this.getNewProducts();
      this.router.navigate(["/clientadmin/products/trial-products"]);
    }, err => {
     console.log(err);
      const errmsg = JSON.parse(err.error);

      this.buyproductconverttotext();
      this.toastr.error(errmsg.message, 'Error');
    })
  }
  
  buy() {
    this.buyproductconverttonumber();
    this.tenantService.activateLicense(this.selproductId,'forBuy').subscribe((res) => {
      this.toastr.success('The product has been added to the subscribed products', 'Success');
      this.getNewProducts();
      this.router.navigate(["/clientadmin/products/subscribed-products"]);
    }, err => {
      console.log(err);
      this.buyproductconverttotext();
      this.toastr.error(err.error.message, 'Error');
    })
  }
}