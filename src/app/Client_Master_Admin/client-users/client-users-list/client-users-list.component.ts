import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Register, Product } from 'src/app/share/model/model';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { RegisterService } from 'src/app/share/service/register.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { TenantListService } from 'src/app/admin/Admin-Share/tenant-list.service';

import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';
declare var $;

@Component({
  selector: 'app-client-users-list',
  templateUrl: './client-users-list.component.html',
  styleUrls: ['./client-users-list.component.css']
})
export class ClientUsersListComponent implements OnInit {

  searchTerm: string;
  siteadmins: Register[] = [];
  siteusers: Register[] = [];
  siteadminindex;
  p = 1;
  userProducts: Product[] = [];
  username: string = '';

  constructor(private router: Router,
    private data: DataShareService,
    private toastr: ToastrService,
    private reg: RegisterService,
    private auth: AuthenticationService,
    private tenantList: TenantListService) { }

  ngOnInit() {
    this.getSiteAdmins(this.auth.decoded.sub)
  }

  getHtmlData(username: string) {
    console.log(username);
    this.username = username;
    this.getProductsOnUserName(username);
  }

  getProductsOnUserName(username: string) {
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
    }, (err: HttpErrorResponse) => {
      if (err.status == 417) {
        this.noProductsPopover(username);
      }
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

  getSiteAdmins(clientAdminname: string) {
    this.reg.getSiteAdmins(clientAdminname).subscribe(
      (response) => {
        console.log(response);
        this.siteadmins = response;
        this.siteusers = [];
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "Error");
      }
    );
  }

  getSiteUsers(Siteadmin: string, index: number) {
    this.siteadminindex = index;
    this.reg.getSiteUsers(this.auth.decoded.sub, Siteadmin).subscribe(
      (response) => {
        console.log(response);
        console.log(this.siteadminindex);
        this.siteusers = response;
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "Error");
      }
    );
  }

  updateUser(register) {
    console.log(register);
    sessionStorage.setItem('UserDetails', JSON.stringify(register));
    this.data.anyData = register;
    this.router.navigate(['clientadmin/users/edit-client-user']);
  }

/*   key: string = 'country';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  } */

}

