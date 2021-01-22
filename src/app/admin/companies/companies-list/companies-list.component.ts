import { Component, OnInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Register, Product } from 'src/app/share/model/model';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { RegisterService } from 'src/app/share/service/register.service';
import { TenantListService } from '../../Admin-Share/tenant-list.service';
import { TenantServiceService } from 'src/app/tenant/service/tenant-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';
declare var $;

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})

export class CompaniesListComponent implements OnInit {

  @ViewChild('forLoop', { static: false }) forLoop: HTMLElement;

  searchTerm: string;
  clientadmins: Register[] = [];
  siteadmins: Register[] = [];
  siteusers: Register[] = [];
  roleusers: Register[] = [];
  clientAdminname: string;
  clientadminindex;
  siteadminindex;
  p = 1;
  //companyProducts: Product[] = [];
  userProducts: Product[] = [];
  username: string = '';
  loading = false;
  userSubscribedProd: any;
  constructor(
    private router: Router,
    private data: DataShareService,
    private toastr: ToastrService,
    private title: PageTitleService,
    private reg: RegisterService,
	public sanitizer: DomSanitizer,
    private tenantList: TenantListService, private tenantService: TenantServiceService) { }

  ngOnInit() {
    this.title.adminTitle = "Companies List";
    this.getClientAdmins();
    this.getRoleUsers();
  }

  getHtmlData(username: string) {
    console.log(username);
    this.username = username;
    this.getProductsOnUserName(username);
  }
  getProductsOnUserName(username: string) {
	this.username = username;
    this.userProducts = null;
    this.tenantList.tenantLicenseWithparticularFileds(username).subscribe((res) => {
      if (res.length != 0) {
        this.userSubscribedProd = res;
        this.userSubscribedProd.forEach((val, i) => {
	   this.tenantService.getProducts(val['productId']).subscribe((response) => {
	    const obj = Object.assign(this.userSubscribedProd[i],response);
	    obj['productName'] = response.productName;
	    obj['productIcon'] = response.productIcon;
	    obj['subscribedBy'] = response.subscribedBy;
	    obj['productDescription'] = response.productDescription;
	    this.userSubscribedProd.push(obj);
	   });
      });
	  this.userProducts = this.userSubscribedProd.filter(function (a) {
       return !this[a.productId] && (this[a.productId] = true);
      }, Object.create(null));
	  console.log('User Length >>>'+this.userProducts.length);
	  //$('#tryModal').modal('show');
      } else {
       this.userProducts = [];
      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 417) {
        //this.noProductsPopover(username);
		this.toastr.error('No products for '+username, "Error");
      }
      this.loading = false;
    })
  }

  

  getRoleUsers() {
    this.reg.getUsersByRole("ROLE_USER").subscribe(
      (response) => {
        console.log(response);
        this.roleusers = response;
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "Error");
      }
    );
  }

  getClientAdmins() {
    this.reg.getUsersByRole("ROLE_CLIENT_MASTER").subscribe(
      (response) => {
        console.log(response);
        this.clientadmins = response;
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "Error");
      }
    );
  }

  getSiteAdmins(clientAdminname: string, index: number) {
    this.clientadminindex = index;
    this.clientAdminname = clientAdminname;
    this.reg.getSiteAdmins(clientAdminname).subscribe(
      (response) => {
        console.log(response);
        this.siteadmins = response;
        this.siteusers = [];
        if (this.siteadmins.length == 0)
          this.toastr.warning('No site admins available', 'Warning');
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "Error");
      }
    );
  }

  getSiteUsers(Siteadmin: string, index: number) {
    this.siteadminindex = index;
    this.reg.getSiteUsers(this.clientAdminname, Siteadmin).subscribe(
      (response) => {
        console.log(response);
        console.log(this.siteadminindex);
        this.siteusers = response;
        if (this.siteusers.length == 0)
          this.toastr.warning('No site companies available', 'Warning');
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "Error");
      }
    );
  }

  updateCompany(register) {
    console.log(register);
    this.data.anyData = register;
    sessionStorage.setItem('CompanyDetails', JSON.stringify(register));
    this.router.navigate(['/admin/companies/edit-company']);
  }

  /*  key: string = 'country';
   reverse: boolean = false;
   sort(key) {
     this.key = key;
     this.reverse = !this.reverse;
   } */

  extendProduct(register) {
    this.data.tenantData = register;
    localStorage.setItem('tenantData', JSON.stringify(register));
    this.router.navigate(['/admin/companies/extend-subscription'])
  }

}

