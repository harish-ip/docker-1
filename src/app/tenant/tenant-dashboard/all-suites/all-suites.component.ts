import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Suite } from 'src/app/share/model/model';
import { SuiteService } from 'src/app/admin/Admin-Share/suite.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';

@Component({
  selector: 'app-all-suites',
  templateUrl: './all-suites.component.html',
  styleUrls: ['./all-suites.component.css']
})

export class AllSuitesComponent implements OnInit {

  allSuites: Suite[];                   // To get the All Suites

  constructor(
    private suiteService: SuiteService,
    public title: PageTitleService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.title.tenantTitle = "All Suites";
    this.getSuites();
  }

  getSuites() {
    this.title.isLoding = false;
    this.suiteService.suitesList().subscribe(res => {
      this.allSuites = res;
      console.log(this.allSuites);
      setTimeout(() => { this.title.isLoding = true; }, 1000);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error');
      setTimeout(() => { this.title.isLoding = true; }, 1000);
    });
  }

}
