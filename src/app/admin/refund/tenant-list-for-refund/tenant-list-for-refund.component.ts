import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { Register } from 'src/app/share/model/model';
import { RefundService } from '../../Admin-Share/refund.service';
import { TenantListService } from '../../Admin-Share/tenant-list.service';

@Component({
  selector: 'app-tenant-list-for-refund',
  templateUrl: './tenant-list-for-refund.component.html',
  styleUrls: ['./tenant-list-for-refund.component.css']
})
export class TenantListForRefundComponent implements OnInit {

  searchTerm: string;
  user: Register[];
  constructor(private title: PageTitleService,
    private service: TenantListService,
    private router: Router,
    private toastr: ToastrService,
    private refund: RefundService, ) { }

  ngOnInit() {
    this.title.adminTitle = "Tenant List For Refund";
    this.getTenant();
  }
  getTenant() {
    this.service.registerTenant().subscribe(
      (response) => {
        console.log(response);
        this.user = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  navigation(username, email) {
    this.refund.username.next(username);
    this.refund.email.next(email);
    localStorage.setItem('refundUsername', username);
    localStorage.setItem('refundUserEmail', email);
    this.router.navigate(['/admin/refund/Refund-and-adjustment']);
  }

  key: string = 'country';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


}

