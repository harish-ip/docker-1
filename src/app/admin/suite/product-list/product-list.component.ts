import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/share/model/model';
import { ProductService } from '../../Admin-Share/product.service';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  searchTerm: string;
  products: Product[];
  p = 1;
  productIcon = [];
  pid;
  prdname;
  prddesc;

  constructor(private service: ProductService,
    private router: Router,
    private data: DataShareService,
    private toastr: ToastrService,
    public title: PageTitleService,
    public santizer: DomSanitizer) { }

  ngOnInit() {
    this.title.adminTitle = "Product List";
    this.getProductsList();
  }

  getProductsList() {
    this.title.isLoding = false;
    this.service.productsList().subscribe(
      (response) => {
        setTimeout(() => { this.title.isLoding = true; }, 1000);
        console.log(response);
        this.products = response;
        this.getproducticons();
        if (this.service.productsList !== null) {
          this.service.productsCount.next(this.products.length);
        } else {
          this.service.productsCount.next(0);
        }
      },
      (err) => {
        console.log(err);
        if (err.status == 500) {
          this.toastr.error(err.error.message, 'Error');
        }
        setTimeout(() => { this.title.isLoding = true; }, 1000);
      }
    )
  }


  getproducticons() {
    for (var i = 0; i < this.products.length; i++) {
      this.productIcon[i] = this.santizer.bypassSecurityTrustResourceUrl(this.products[i].productIcon)
    }
  }

  select() {
    this.router.navigate(['/admin/suites/product-list']);
  }
  /*  if (this.cart.products !== null) {
        this.cart.cartIndicationNum = this.cartitems.length;
        this.initialCheckBox(this.cartitems.length);
      } else {
        this.cart.cartIndicationNum = 0;
      } */

  UpdateProduct(product: Product) {
    this.data.product = product;
    this.router.navigate(['/admin/suites/edit-product']);
  }

  getDeletePrdDetails(product: Product) {
    this.pid = product.productId;
    this.prdname = product.productName;
    this.prddesc = product.productDescription;
  }

  DeleteProduct() {

    console.log("Implement delete functionality here");
    console.log(this.pid);
    this.service.deleteProduct(this.pid).subscribe(
      () => {
        this.toastr.success(`Product id: ${this.pid} deleted successfully`, "Success");
        const val = this.service.productsCount.value - 1;
        this.service.productsCount.next(val);
        this.getProductsList();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  key: string = 'productName';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
