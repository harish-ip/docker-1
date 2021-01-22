import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Product, Suite } from 'src/app/share/model/model';
import { SuiteService } from '../../Admin-Share/suite.service';
import { RefundService } from '../../Admin-Share/refund.service';

@Component({
  selector: 'app-refund-and-adjustment',
  templateUrl: './refund-and-adjustment.component.html',
  styleUrls: ['./refund-and-adjustment.component.css']
})
export class RefundAndAdjustmentComponent implements OnInit {

  suites: Suite[];
  products: Product[] = [];
  tenantName: string;
  selectedProductToExchange: Product = null;
  ProductDuration: string;
  productId: number;
  suitesarray: Suite[] = [];

  product: Product = {
    productId: null,
    productName: null,
    productPrice: null,
    productURL: null,
    productDescription: null,
    productDuration: "30",
    productImage: null,
    paymentMode: null,
    transactionNumber: ''
  };

  selectedProduct: string = null;
  selectedProDuration = "30";
  selectedSuite: Suite = null;
  selectedProductArray: Product[] = [];
  sendProduct: Product = null;
  paymentMode = "0";
  transactionNumber;

  constructor(private refund: RefundService,
    public title: PageTitleService,
    private toaster: ToastrService,
    private suiteService: SuiteService,
    private router: Router) { }

  ngOnInit() {
    this.title.adminTitle = "Refund & Adjustment";
    this.tenantName = this.refund.username.value;
    if (this.tenantName) {
      this.tenantName = this.tenantName.charAt(0).toUpperCase() + this.tenantName.slice(1);
      this.title.isLoding = true;
      this.getAllTenantProducts();
    }
    this.getSuites();
  }
  // get all tenant products
  getAllTenantProducts() {
    this.refund.getAllTenantProducts(this.refund.email.value).subscribe(res => {
      console.log(res);
      this.products = res;
      this.title.isLoding = false;
    }, err => {
      if (err.status === 500)
        this.toaster.warning("No products are subscribed", "Warning");
    });
  }

  // Get All suites
  getSuites() {
    this.suiteService.suitesList().subscribe((response) => {
      this.suites = response;
      console.log(response);
    },
      (err) => {
        console.log(err);
      }
    );
  }

  // Refund Button clicked
  refundProduct(product: Product) {
    this.refund.refundProduct = product;
    this.router.navigate(['/admin/refund/refund-amount']);
  }

  clear() {
    this.getSuites();
  }

  // Exchnage Button clicked
  getproduct(sendProduct: Product) {
    this.selectedProductToExchange = sendProduct;
    this.getSuiteName(this.suites[0].suiteName);
    this.getProductname(this.selectedProductArray[0].productName);
    if (this.selectedProductToExchange.productDuration === '30')
      this.ProductDuration = 'One Month';
    else if (this.selectedProductToExchange.productDuration === '365')
      this.ProductDuration = 'One Year';
  }

  /* Add product button clicked */
  addproduct() {
    this.router.navigate(['/admin/refund/offline-payment']);
  }

  /* selected suite name */
  getSuiteName(suitename) {
    console.log("getSuiteName", suitename);
    const index = this.suites.findIndex(a => a.suiteName == suitename);
    this.selectedSuite = this.suites[index];
    console.log(this.selectedSuite);
    this.selectedProductArray = this.selectedSuite.products;
    if (this.selectedProductArray.length != 0) {
      this.sendProduct = this.selectedProductArray[0];
    } else {
      this.sendProduct = null;
      this.toaster.warning("No products on " + suitename, "Warning");
    }
  }
  /* selected product name */
  getProductname(prodName) {
    console.log("getProductname", prodName);
    this.selectedProduct = prodName;
    const index = this.selectedProductArray.findIndex(a => a.productName == prodName);
    this.sendProduct = this.selectedProductArray[index];
  }
  /* selected duration */
  getproductDuration(value) {
    this.selectedProductToExchange.productDuration = value;
  }

  paymentmode(value) {
    console.log(value);
    this.paymentMode = value;
  }


  // Save Changes button clicked
  ExchangeProduct() {

    this.sendProduct.paymentMode = this.paymentMode;
    this.sendProduct.transactionNumber = this.product.transactionNumber;
    console.log(this.sendProduct);

    if (this.sendProduct == null) {
      this.toaster.warning('Please select exchange product', 'Warning');
      return;
    }
    if (this.paymentMode != '0' && this.product.transactionNumber.length != 0) {
      this.refund.exchangeProduct(this.sendProduct, this.refund.email.value, this.selectedProductToExchange.productId).subscribe(
        (response) => {
          console.log(response);
          this.sendProduct = null;
        },
        (err) => {
          console.log(err);
          this.sendProduct = null;
          if (err.status === 200) {
            console.log("sent");
            this.ngOnInit();
            this.toaster.success("Product exchanged successfully.", 'Success');
            this.router.navigate(['/admin/refund/Refund-and-adjustment']);
          } else if (err.status === 500) {
            this.toaster.error(err.error.message, "Error");
          }
        }
      )
    } else {
      this.toaster.warning("Please select Payment Mode", "Warning");
    }
  }
}
