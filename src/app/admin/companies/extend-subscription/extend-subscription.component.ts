import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Product } from 'src/app/share/model/model';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { TenantListService } from '../../Admin-Share/tenant-list.service';
import { TenantServiceService } from 'src/app/tenant/service/tenant-service.service';
@Component({
  selector: 'app-extend-subscription',
  templateUrl: './extend-subscription.component.html',
  styleUrls: ['./extend-subscription.component.css']
})

export class ExtendSubscriptionComponent implements OnInit {

  tenantSubscribedProducts: Product[] = [];
  showTenantProducts = false;
  showTemplate: boolean = false;
  selectedProduct: Product = null;
  extendPeriod: number = 7;
  productIcon = [];
  newDates = [];
  status = [];
  tenantName: string = null;
  timeFromBackEnd: string = null;
  date;
  minDate;
  maxDate;
  expanded: boolean[] = [];
  tSubscribedProducts: any;
  constructor(private tenantService: TenantServiceService,private title: PageTitleService,
    private service: TenantListService,
    private data: DataShareService,
    private toastr: ToastrService,
    private calendar: NgbCalendar,
    public santizer: DomSanitizer) { }

  ngOnInit() {
    this.title.adminTitle = "Extend Subscription";
    this.data.tenantData = JSON.parse(localStorage.getItem('tenantData'));
    if (this.data.tenantData) {
      const name = this.data.tenantData.username;
      this.tenantName = name;
      if (this.data.tenantData != null) {
        this.showTemplate = true;
        this.getProducts();
      }
    };
  }

  clearDate(){
    this.date = null;
  }

  getDateTime() {
    this.service.getDate().subscribe((res) => {
      this.timeFromBackEnd = res
    }, err => {
      console.log(err);
    })
  }

  readmore(id) {
    this.expanded[id] = true;
  }

  Readless(id) {
    this.expanded[id] = false;
  }

  getProducts() {
    this.title.isLoding = false;
    this.service.tenantProductsByAdmin(this.tenantName).subscribe((res) => {
      console.log(res['uniqueProducts']);
      if (res !== null) {
        this.tSubscribedProducts = res;
        this.tSubscribedProducts.forEach((val, i) => {
	    this.tenantService.getProducts(val['productId']).subscribe((response) => {
	     const obj = Object.assign(this.tSubscribedProducts[i],response);
	     obj['productName'] = response.productName;
	     obj['productIcon'] = response.productIcon;
	     obj['subscribedBy'] = response.subscribedBy;
	     obj['productDescription'] = response.productDescription;
	     this.tSubscribedProducts.push(obj);
	    });
        });
		this.tenantSubscribedProducts = this.tSubscribedProducts;
        this.tenantSubscribedProducts = this.tSubscribedProducts.filter(function (a) {
         return !this[a.productId] && (this[a.productId] = true);
        }, Object.create(null));
        this.getDateTime();
        this.getproducticons();
        if (this.tenantSubscribedProducts.length > 0) {
          setInterval(() => { }, 1500);
          this.showTenantProducts = true;
        }
        setTimeout(() => { this.title.isLoding = true; }, 1500);
      }
    },
      (err) => {
        console.log(err);
        if (err.status == 417) {
          this.toastr.error("No subcribed products", 'Error');
        }
        setTimeout(() => { this.title.isLoding = true; }, 1500);
      });
  }

  getproducticons() {
    for (var i = 0; i < this.tenantSubscribedProducts.length; i++) {
      this.productIcon[i] = this.santizer.bypassSecurityTrustResourceUrl(this.tenantSubscribedProducts[i].productIcon)
      this.expanded.push(false);
      console.clear();
      console.log(this.expanded);
    }
  }

  /*  statusDateForTenantProducts() {
     if (this.tenantSubscribedProducts.length !== 0) {
       for (let i = 0; i < this.tenantSubscribedProducts.length; i++) {
         const date: Date = new Date(this.tenantSubscribedProducts[i].startDate);
         this.newDates[i] = date;
         const num = +this.tenantSubscribedProducts[i].productDuration;
         // const days = num + this.tenantSubscribedProducts[i].extensionDays;
         this.newDates[i].setDate(this.newDates[i].getDate() + num);
       }
 
       for (let i = 0; i < this.tenantSubscribedProducts.length; i++) {
         const date1 = new Date(this.newDates[i]);
         const date2 = new Date(this.timeFromBackEnd);
         const diff = Math.abs(date1.getTime() - date2.getTime());
         const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
         this.status[i] = diffDays;
       }
     }
   } */

  getSelectedProduct(prod: Product) {
    this.selectedProduct = prod;
    const productIndex = this.tenantSubscribedProducts.findIndex(i => i.productId === prod.productId);
    this.setMinimumDate(productIndex);
  }

  setMinimumDate(index?: number) {
    // console.log(prod, index);
    const tenantEndDate: Date = new Date(this.tenantSubscribedProducts[index].endDate);
    console.log(tenantEndDate);

    this.minDate = {
      year: tenantEndDate.getFullYear(),
      month: tenantEndDate.getMonth() + 1,
      day: tenantEndDate.getDate() + 1
    };
    console.log(this.minDate);
    this.maxDate = this.calendar.getNext(this.minDate, 'd', 14);
    console.log(this.maxDate);
  }

  extendProduct() {
    console.log(this.date);
    if (this.date == (undefined || null)) {
      this.toastr.warning("Please select date to extend product time period", "Warning");
      return
    }
    console.log(new Date(this.date['year'] + '/' + this.date['month'] + '/' + this.date['day']));
    const extendDate = new Date(this.date['year'] + '/' + this.date['month'] + '/' + this.date['day']);
    console.log(extendDate);

    this.service.tenantExtendProductPeriod(this.tenantName, this.selectedProduct.productId, extendDate).subscribe(
      res => {
        console.log(res);
        this.toastr.success(`Extend time period with product ${this.selectedProduct.productName} is updated successfully`, 'Success');
        this.getProducts();
        this.clearDate();
      }, err => {
        console.log(err);
        this.clearDate();
        this.toastr.error(err.error.message, 'Error');
      }
    )
  }
}

