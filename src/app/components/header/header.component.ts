import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { CartService } from 'src/app/share/service/cart.service';
import { WelcomeService } from 'src/app/share/service/welcome.service';
import { Product } from 'src/app/share/model/model';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { ToastrService } from 'ngx-toastr';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { RefundService } from 'src/app/admin/Admin-Share/refund.service';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/share/service/register.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userName = this.auth.loggedFirstName;
  isLoggedin = this.auth.isUserLoggedIn();
  searchForProduct: string = '';
  productsList: Product[] = [];
  @ViewChild('closeModal', { static: true }) inputEl: ElementRef;
  location;
  loggedFirstName;

  constructor(public auth: AuthenticationService,
    private router: Router,
    public cart: CartService,
    private welcome: WelcomeService,
    public dataShare: DataShareService,
    private refund: RefundService,
    private toastr: ToastrService,
    public title: PageTitleService,
    public register: RegisterService) {
    this.auth.userDetails.subscribe(val => {
      this.location = val;
    })
/*     this.register.clickNotification.subscribe(() => {
      if (this.register.clickNotification.value)
        this.getnotificationcount();

    })
    this.register.clickClientNotication.subscribe(() => {
      if (this.register.clickClientNotication.value)
        this.getclientnotificationcount();


    }) */
  }

  ngOnInit(): void {
    this.register.clickNotification.next(true);
    this.register.clickClientNotication.next(true);
    this.location = localStorage.getItem("location");
	this.loggedFirstName = localStorage.getItem("logfirstName");
	//this.userName = localStorage.getItem("logfirstName");
	this.userName = this.auth.loggedFirstName;
    this.title.showSearchBar = 'welcome';
    this.isLoggedin = this.auth.isUserLoggedIn();
    //this.countNotificationCount();
	 this.detectBrowserRefresh();
  }

  countNotificationCount() {
    if (this.auth.rolebase == "ROLE_ADMIN") {
      this.getnotificationcount();
    } else if (this.auth.rolebase == "ROLE_CLIENT_MASTER") {
      this.getclientnotificationcount();
    } else if (this.auth.rolebase == "ROLE_SITE_ADMIN") {
      this.getclientnotificationcount();
    } else if (this.auth.rolebase == "ROLE_USER" || this.auth.rolebase == "ROLE_SITE_USER") {
      this.getclientnotificationcount();
    }
  }

  getnotificationcount() {
    this.register.allNotificationCount().subscribe(
      (response) => {
        console.log(response);
        this.register.notificationCount.next(response);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getclientnotificationcount() {
    this.register.clientNotificationCount(this.dataShare.email.value).subscribe(
      (response) => {
        console.log(response);
        this.register.clientNotificationsCount.next(response);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.dataShare.mainLoading.next(true);
    this.auth.logout();
    this.userName = null;
    this.cart.cartIndicationNum = 0;
    this.cart.onInitialCart.next(null);
    this.refund.username.next(null);
    this.refund.email.next(null);
    this.dataShare.userdetails.next(null);
    this.dataShare.mainLoading.next(false);
    this.router.navigate(['/signin']);

  }

  search() {
    let el: HTMLElement = document.getElementById('displayModal') as HTMLElement;
    if (this.searchForProduct.trim().length > 0) {
      this.welcome.searchForProducts(this.searchForProduct.trim()).subscribe(res => {
        console.log(res);
        if (res.length != 0) {
          this.dataShare.productsSearch = res;
          this.productsList = this.dataShare.productsSearch;
          this.searchForProduct = '';
          /* el.setAttribute("data-toggle", "modal");
          el.setAttribute("data-target", ".bd-searchProd-modal-lg");
          el.click(); */
          $(document).ready(function () {
            $("#searchModal").modal("show");
          });
        } else {
          this.toastr.warning("No products on " + this.searchForProduct, "Warning")
          this.searchForProduct = '';
        }
      }, err => {
        console.log(err);
      })
    } else {
      // el.removeAttribute()
      if (el.getAttribute('data-target')) {
        el.removeAttribute('data-toggle');
        el.removeAttribute('data-target');
      }
      this.toastr.warning("Please enter product name", "Warning");
      this.searchForProduct = '';
    }
  }

  redirect(prod: Product) {
    console.log(prod);
    $(document).ready(function () {
      $("#searchModal").modal("hide");
    });
    // this.dataShare.productsSearch = [prod];
    this.default();

    this.dataShare.productsdetail = prod;
    this.dataShare.samePageInProd.next(true);
    if (this.auth.rolebase == "ROLE_USER" || this.auth.rolebase == "ROLE_SITE_USER")
      this.router.navigate(['/tenant/products/productdetail']);
    else if (this.auth.rolebase == "ROLE_CLIENT_MASTER")
      this.router.navigate(['/clientadmin/products/product-details']);
    else if (this.auth.rolebase == "ROLE_SITE_ADMIN")
      this.router.navigate(['/siteadmin/products/products-details']);
  }


  default() {
    this.productsList = [];
    this.searchForProduct = '';
  }
    detectBrowserRefresh() {
    const reload = sessionStorage.getItem('firstReload');
    //console.log("detectBrowserRefresh ", reload);
	this.loggedFirstName = localStorage.getItem("logfirstName");
	}
}