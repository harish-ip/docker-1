import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Suite, Product } from 'src/app/share/model/model';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { SuiteService } from '../../Admin-Share/suite.service';
import { RefundService } from '../../Admin-Share/refund.service';


@Component({
  selector: 'app-offline-payment',
  templateUrl: './offline-payment.component.html',
  styleUrls: ['./offline-payment.component.css']
})
export class OfflinePaymentComponent implements OnInit {

  product: Product = {
    productId: null,
    productName: null,
    productPrice: null,
    productURL: null,
    productDescription: null,
    productDuration: '30',
    productImage: null,
    paymentMode: null,
    transactionNumber: null,
  };
  index = 0;
  tenantName: string;
  suites: Suite[];
  products: Product[];
  loading: boolean = false;
  duration = [];
  selectedSuite: Suite[] = [];
  selectedProduct: Product;
  paymentMode = "0";
  transactionNumber;
  isEnabled: boolean = false;

  constructor(public title: PageTitleService,
    private suiteService: SuiteService,
    private refund: RefundService,
    private toaster: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.title.adminTitle = "Offline Payment";
    this.tenantName = this.refund.username.value;
    if (this.tenantName)
      this.tenantName = this.tenantName.charAt(0).toUpperCase() + this.tenantName.slice(1);
    this.getSuites();
  }

  getSuites() {
    this.suiteService.suitesList().subscribe(
      (Response) => {
        this.suites = Response;
        console.log(Response);
        this.products = this.suites[0].products;
        this.selectedSuite.push(this.suites[0]);
        this.selectedProduct = this.suites[0].products[0];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Get All Products against Suite Name
  suiteProducts(value: string) {
    console.log(value);
    const a = this.suites.filter(a => a.suiteName == value);
    console.log("a", a);
    this.selectedSuite = a;
    if (this.selectedSuite.length != 0) {
      if (this.selectedSuite[0].products.length != 0) {
        this.selectProduct(this.selectedSuite[0].products[0].productName);
        this.isEnabled = false;
      } else {
        this.selectedProduct = null;
        this.toaster.warning("No products on " + value, "Warning");
        this.isEnabled = true;
      }
    }
  }

  selectProduct(prodName: string) {
    for (let i = 0; i < this.selectedSuite[0].products.length; i++) {
      console.log(prodName);
      if (this.selectedSuite[0].products[i].productName == prodName) {
        console.log("in if ", prodName);
        this.selectedProduct = this.selectedSuite[0].products[i];
        console.log(this.selectedSuite[0].products[i]);
      }
    }
  }

  /* product Duration */
  productDuration(value) {
    this.selectedProduct.productDuration = value;
  }

  /* product Duration */
  paymentmode(value) {
    this.paymentMode = value;
  }

  /* product add button clicked */
  addProduct() {
    console.log(this.selectedProduct);
    console.log(this.paymentMode);
    console.log(this.transactionNumber);
    if (this.tenantName && this.selectedProduct != null && this.paymentMode != '0') {
      this.loading = true;
      this.refund.addProduct(this.refund.email.value, this.paymentMode, this.transactionNumber, [this.selectedProduct]).subscribe(
        (res) => {
          this.loading = false;
          console.log(res);
          this.toaster.success("Product added successfully.", 'Success');
          this.router.navigate(['/admin/refund/Refund-and-adjustment']);
        },
        (err) => {
          this.loading = false;
          console.log(err);
          if (err.status === 200) {
            console.log("sent");
          } else if (err.status === 500) {
            this.toaster.error(err.error.message, "Error");
          }
        }
      )
    } else {
      if (!this.tenantName) {
        this.toaster.warning("Please select the tenant name", 'Warning');
      } else if (this.selectedProduct == null) {
        this.toaster.warning("Please select product", 'Warning');
      } else if (this.paymentMode == '0') {
        this.toaster.warning("Please select payment mode", 'Warning');
      }
    }
  }
}
