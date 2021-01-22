import { Component, OnInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Register, Product } from 'src/app/share/model/model';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { RegisterService } from 'src/app/share/service/register.service';
import { TenantListService } from '../../Admin-Share/tenant-list.service';

import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';
declare var $;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {

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
  userProducts: Product[] = [];
  username: string = '';
  loading = false;

  constructor(
    private router: Router,
    private data: DataShareService,
    private toastr: ToastrService,
    private title: PageTitleService,
    private reg: RegisterService,
    private tenantList: TenantListService) { }

  ngOnInit() {
    this.title.adminTitle = "User List";
    this.getClientAdmins();
    this.getRoleUsers();
  }

  getHtmlData(username: string) {
    console.log(username);
    this.username = username;
    this.getProductsOnUserName(username);
  }

  getProductsOnUserName(username: string) {
    this.loading = true;
    this.tenantList.tenantLicenseWithparticularFileds(username).subscribe((res) => {
      console.log(res);
      if (res.length != 0) {
        this.userProducts = res[0].uniqueProducts;
        console.log(this.userProducts);
        const source = timer(300);
        const subscribe = source.subscribe((val) => {
          console.log("val", val);
          this.initializePopover(username);
        });
        setTimeout(() => { subscribe.unsubscribe(); }, 1500);
      } else {
        this.noProductsPopover(username);
      }
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      if (err.status == 417) {
        this.noProductsPopover(username);
      }
      this.loading = false;
    })
  }

  initializePopover(un: string) {
    // console.log("initializePopover");
    $('#' + un).popover({
      content: $('#myPopoverContent').html(),
      html: true,
      sanitizeFn: content => content
    }).click(function () {
      $(this).popover('show');
    });
    $('#' + un).popover('show');
  }

  noProductsPopover(username: string) {
    console.log();
    this.username = username;
    $('#' + username).popover({
      content: $('#noProducts').html(),
      html: true,
      sanitizeFn: content => content
    }).click(function () {
      $(this).popover('show');
    });
    $('#' + username).popover('show');
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
          this.toastr.warning('No site users available', 'Warning');
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "Error");
      }
    );
  }

  updateUser(register) {
    console.log(register);
    this.data.anyData = register;
    sessionStorage.setItem('UserDetails', JSON.stringify(register));
    this.router.navigate(['/admin/users/edit-user']);
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
    this.router.navigate(['/admin/users/extend-subscription'])
  }

}

