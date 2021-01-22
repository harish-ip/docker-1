import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../share/service/authentication.service';
import { CartService } from '../share/service/cart.service';
import { Product, Checkbox } from '../share/model/model';
import { TenantServiceService } from '../tenant/service/tenant-service.service';
import { DataShareService } from '../share/service/data-share.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})

export class ViewcartComponent implements OnInit, OnDestroy {

  public checkbox: Checkbox[] = [];
  cartitems = [];   // To get the cartitems from the service
  OrderSummaryProducts = [];   // To get the cartitems Oder Summary
  subend: any;
  totalprice = 0;
  role: any;
  products: Product[];
  loading = false;


  constructor(
    private router: Router,
    public auth: AuthenticationService,
    private toastr: ToastrService,
    private cart: CartService,
    private tenant: TenantServiceService,
    private data: DataShareService) { }

  ngOnInit() {
    this.getCartItems();
  }

  navigate() {
    if (this.auth.decoded.auth.authority == 'ROLE_CLIENT_MASTER') {
      this.router.navigate(['/clientadmin/products/product-list']);
    } else if (this.auth.decoded.auth.authority == 'ROLE_SITE_ADMIN') {
      this.router.navigate(['/siteadmin/products/product-list']);
    } else if (this.auth.decoded.auth.authority == 'ROLE_USER' || this.auth.decoded.auth.authority == 'ROLE_SITE_USER') {
      this.router.navigate(['//tenant/products/new-products']);
    }
  }

  getCartItems() {
    if (this.auth.isUserLoggedIn()) {

      this.cart.getFromCart().subscribe(res => {

        this.cartitems = res['uniqueProductDTO'];
        this.cart.products = this.cartitems;

        // Cart indication number
        if (this.cart.products !== null) {
          this.cart.cartIndicationNum = this.cartitems.length;
          this.initialCheckBox(this.cartitems.length);
        } else {
          this.cart.cartIndicationNum = 0;
        }

        // Order Summary details
        if (this.cartitems !== null) {
          for (let i = 0; i < this.cartitems.length; i++) {

            this.OrderSummaryProducts.push(this.cartitems[i]);
            this.totalprice = this.totalprice + this.cartitems[i].productPrice;

            if (this.cartitems[i].productDuration == '30') {
              this.cartitems[i].startDate = new Date();
              this.subend = new Date();
              this.subend.setDate(this.subend.getDate() + 30);
            }
            else if (this.cartitems[i].productDuration == '365') {
              this.cartitems[i].startDate = new Date();
              this.subend = new Date();
              this.subend.setDate(this.subend.getDate() + 365);
            }
            else if (this.cartitems[i].productDuration == '1095') {
              this.cartitems[i].startDate = new Date();
              this.subend = new Date();
              this.subend.setDate(this.subend.getDate() + 1095);
            }

          }
        }
      }, err => {
        console.log(err);
      });
    }
  }

  initialCheckBox(num) {
    // console.log(num);
    this.checkbox.length = 0;
    for (let i = 0; i < num; i++) {
      let ch = {
        checked: true,
        value: null
      };
      this.checkbox.push(ch);
    }
  }

  // Get the checked product summary
  checked(event, index, cartitem) {

    this.checkbox[index].checked = event.target.checked;

    if (this.checkbox[index].checked == true) {
      this.totalprice = this.totalprice + cartitem.productPrice;
      this.cart.cartIndicationNum = this.cart.cartIndicationNum + 1;
      this.OrderSummaryProducts.push(cartitem);

    } else if (this.checkbox[index].checked == false) {

      for (let i = 0; i < this.OrderSummaryProducts.length; i++) {

        if (this.OrderSummaryProducts[i].productName == cartitem.productName) {
          let index1 = this.OrderSummaryProducts.findIndex(record => record.productName === cartitem.productName);
          this.OrderSummaryProducts.splice(index1, 1);
          this.totalprice = this.totalprice - cartitem.productPrice;
          this.cart.cartIndicationNum = this.cart.cartIndicationNum - 1;
        }
      }
    }
  }

  activatelicenseForSelectedProducts() {
    // console.log(this.checkbox);
    const products: Product[] = [];
    for (let i = 0; i < this.checkbox.length; i++) {
      // console.log(this.checkbox[i].checked);
      if (this.checkbox[i].checked == true) {
        products.push(this.cartitems[i]);
      }
    }
    if (products.length !== 0) {
      this.loading = true;
      console.log(products)
      products[0].subscribedBy = this.auth.decoded.sub;
      this.tenant.activateLicense(products,'forTrail')
        /* .pipe(map((res: Response) => res.json())) */
        .subscribe(res => {
          if (products.length == 1)
            this.toastr.success("Product subscribed successfully", 'Success');
          else
            this.toastr.success("Products are subscribed successfully", 'Success');
          // this.cart.totalSelectedProducts = products.length;
          this.cart.cartIndicationNum = (this.cart.cartIndicationNum - products.length);
          this.loading = false;
          if (this.auth.decoded.auth.authority == 'ROLE_CLIENT_MASTER') {
            this.router.navigate(['/clientadmin/products/subscribed-products']);
          } else if (this.auth.decoded.auth.authority == 'ROLE_SITE_ADMIN') {
            this.router.navigate(['/siteadmin/products/subscribed-products']);
          } else if (this.auth.decoded.auth.authority == 'ROLE_USER' || this.auth.decoded.auth.authority == 'ROLE_SITE_USER') {
            this.router.navigate(['/tenant/products/subscribed-products']);
          }
        }, err => {
          if (err.status === 500) {
            this.toastr.warning(err.error.message, 'Warning');
          }
          console.log(err);
          this.loading = false;
        })
    } else {
      this.toastr.warning('Please select the checkbox to subscribe', 'Warning');
    }
  }



  // After login operations on cartitem 
  removecartitem(index, cartitem: Product) {
    if (this.auth.isUserLoggedIn() && this.checkbox[index].checked == true) {
      if (confirm("Are you sure to remove " + cartitem.productName)) {
        this.cart.deleteProductFromCart(cartitem.productId).subscribe(res => {
          const index = this.cartitems.findIndex(a => a.productId == cartitem.productId);
          if (index > -1) {
            this.cart.products.splice(index, 1);
            // console.log(this.cartitems);
            // console.log(this.cart.products);
            this.OrderSummaryProducts.splice(index, 1);
            this.cart.cartIndicationNum = this.cart.products.length;
            // console.log(this.cart.cartIndicationNum);
            this.initialCheckBox(this.cart.cartIndicationNum);
            this.totalprice = this.totalprice - cartitem.productPrice;
            this.toastr.success('The product has been removed from the shopping cart', 'Success');
          }
        }, err => {
          if (err.status === 200) {
            const index = this.cartitems.findIndex(a => a.productId == cartitem.productId);
            if (index > -1) {
              this.cart.products.splice(index, 1);
              // console.log(this.cartitems);
              // console.log(this.cart.products);
              this.OrderSummaryProducts.splice(index, 1);
              this.cart.cartIndicationNum = this.cart.products.length;
              // console.log(this.cart.cartIndicationNum);
              this.initialCheckBox(this.cart.cartIndicationNum);
              this.totalprice = this.totalprice - cartitem.productPrice;
              this.toastr.success('The product has been removed from the shopping cart', 'Success');
            }
          }
          console.log(err);
        });
      }
    }
    else
      this.toastr.warning('Please select the checkbox to remove', 'Warning');
  }

  ngOnDestroy() {
    this.removeCartItems();
  }

  removeCartItems() {
    if (this.cartitems.length != 0 && (this.data.userdetails.value != null)) {
      this.cart.deleteProductFromCart(this.cartitems[0].productId)
        .subscribe(res => {
          this.toastr.success('The product has been removed from the shopping cart', 'Success');
        }, (err: HttpErrorResponse) => {
          console.log(err);
        });
    }
  }

}
