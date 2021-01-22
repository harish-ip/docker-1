import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Suite } from 'src/app/share/model/model';
import { SuiteService } from '../../Admin-Share/suite.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';

@Component({
  selector: 'app-create-suite',
  templateUrl: './create-suite.component.html',
  styleUrls: ['./create-suite.component.css']
})

export class CreateSuiteComponent implements OnInit {

  suite: Suite = null;
  loading: boolean = false;

  constructor(private service: SuiteService,
    private router: Router,
    private toastr: ToastrService,
    private title: PageTitleService) { }

  ngOnInit() {
    this.title.adminTitle = "Create Suite";
    this.suite = {
      suiteName: '',
      suiteType: '',
      suiteDescription: ''
    }
  }

  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    this.suite.suiteName = splitStr.join(' ');
  }
  /*  validations() {
     if (this.suite.suiteName.trim().length == 0) {
       this.toastr.warning("Suite name can't be empty", "Warning");
       return false;
     } else if (this.suite.suiteName.trim().length < 4) {
       this.toastr.warning("Suite name should be minimum 4 characters", "Warning");
       return false;
     } else {
       this.suite.suiteName.trim();
       return true;
     }
   } */
  createSuite() {
    this.titleCase(this.suite.suiteName);
    console.log(this.suite.suiteName);
    this.loading = true;
    this.service.createSuite(this.suite).subscribe(
      () => {
        this.loading = false;
        const val = this.service.suiteCount.value + 1;
        this.service.suiteCount.next(val);
        console.log(this.suite);
      },
      (err) => {
        console.log(err);
        if (err.status == 200) {
          this.toastr.success("Suite created successfully", "Success");
          this.loading = false;
          const val = this.service.suiteCount.value + 1;
          this.service.suiteCount.next(val);
          this.router.navigate(['/admin/suites']);
        } else if (err.status == 500) {
          this.loading = false;
          this.toastr.warning("Suite name is already exist!", "Warning");
        }
      },
    );
  }
}