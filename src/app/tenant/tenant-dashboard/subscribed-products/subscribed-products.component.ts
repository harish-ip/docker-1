import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { TenantServiceService } from '../../service/tenant-service.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Product } from 'src/app/share/model/model';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribed-products',
  templateUrl: './subscribed-products.component.html',
  styleUrls: ['./subscribed-products.component.css']
})

export class SubscribedProductsComponent implements OnInit {

  tenantSubscribedProducts: Product[] = [];  // To get the Subscribed Products
  timeFromBackEnd: string = null;
  showTenantProducts = false;
  // dateTime = require('date-time');
  newDate = [];
  status = [];
  buttonEnable = [];
  selectedProd: Product;
  token: string = '';
  username: any;

  constructor(private tenantService: TenantServiceService,
    public title: PageTitleService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    private data: DataShareService,
    private router: Router) { }

  ngOnInit() {
    this.title.tenantTitle = "Subscribed Products";
    this.getDateTime();
    this.getSubscribedProducts();
  }

  getSubscribedProducts() {
    this.title.isLoding = false;
    this.tenantService.tenantProducts().subscribe((res) => {
      console.dir(res);
      if (res !== null) {
        this.tenantSubscribedProducts = res['uniqueProducts'];
        // setTimeout(() => { this.title.isLoding = true; }, 1500);
        if (this.tenantSubscribedProducts) {
          if (this.tenantSubscribedProducts.length != 0) {
            this.getDateTime();
            // setTimeout(() => { this.statusDate(); }, 1000);
            this.statusDate();
            this.showTenantProducts = !this.showTenantProducts;
          }
        }
      }
      this.title.isLoding = true;
    }, err => {
      if (err.status == 417) {
        console.log(err);
        this.router.navigate(['/tenant/dashboard/newProducts']);
        this.toastr.warning(`No subscribed products for this tenant ${this.auth.userName}`, 'Warning');
        // setTimeout(() => { this.title.isLoding = true; }, 1500);
        this.title.isLoding = true;
      }
      else {
        console.log(err);
        this.toastr.error(err.error.message, 'Error');
        // setTimeout(() => { this.title.isLoding = true; }, 1500);
        this.title.isLoding = true;
      }
    });
  }

  goToLink(prod: Product) {
    localStorage.setItem("selectedProd", JSON.stringify(prod));
    window.open("tenant/loadApp");
  }

  getSelectedProd(prod: Product) {
    this.selectedProd = prod;
    this.token = this.auth.token;
    this.username = this.auth.userName;
    console.log(prod);
  }

  getDateTime() {
    this.tenantService.getDate().subscribe((res) => {
      this.timeFromBackEnd = res
    }, err => {
      console.log(err);
    })
  }

  statusDate() {
    if (this.tenantSubscribedProducts.length > 0) {
      this.buttonEnable.length = this.tenantSubscribedProducts.length;
      for (let i = 0; i < this.tenantSubscribedProducts.length; i++) {
        const date1 = new Date(this.tenantSubscribedProducts[i].endDate);
        const date2 = new Date(this.timeFromBackEnd);
        if (date2.getTime() > date1.getTime()) {
          this.buttonEnable[i] = true;
        } else
          this.buttonEnable[i] = false;
        const diff = Math.abs(date1.getTime() - date2.getTime());
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        this.status[i] = diffDays;
        this.status[i] = Math.floor(diffDays / 365);
      }
      console.log(this.status);
    }
  }
}
