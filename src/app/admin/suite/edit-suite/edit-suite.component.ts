import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Suite } from 'src/app/share/model/model';
import { SuiteService } from '../../Admin-Share/suite.service';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';

@Component({
  selector: 'app-edit-suite',
  templateUrl: './edit-suite.component.html',
  styleUrls: ['./edit-suite.component.css']
})

export class EditSuiteComponent implements OnInit {

  suite: Suite;
  suiteBoolean = false;

  constructor(private service: SuiteService,
    private router: Router,
    private data: DataShareService,
    private toastr: ToastrService,
    private title: PageTitleService) { }

  ngOnInit() {
    this.title.adminTitle = "Edit Suite";
    this.suite = {
      suiteName: null,
      suiteType: null,
      suiteDescription: null
    }
    // const suiteEdit = JSON.parse(sessionStorage.getItem('suiteEdit'));
    const suiteEdit = this.data.suite;
    // alert();   
    if (suiteEdit) {
      this.suite = suiteEdit;
      this.suiteBoolean = !this.suiteBoolean;
    }

  }

  editSuite() {

    this.service.editSuite(this.suite).subscribe(
      () => {
        console.log(this.suite)
      },
      (err) => {
        if (err.status == 200) {
          this.toastr.success(`suite updated successfully with suite id ${this.suite.suiteId}`, "Success");
          this.data.suite = null;
          this.router.navigate(['/admin/suites']);
        } else if (err.status == 500) {
          this.toastr.warning("Suite name is already exist!", "Warning");
        }
        console.log(err);
      }
    );

  }

}
