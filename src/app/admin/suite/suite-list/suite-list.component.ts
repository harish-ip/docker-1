import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Suite } from 'src/app/share/model/model';
import { SuiteService } from '../../Admin-Share/suite.service';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';

@Component({
  selector: 'app-suite-list',
  templateUrl: './suite-list.component.html',
  styleUrls: ['./suite-list.component.css']
})

export class SuiteListComponent implements OnInit {

  suites: Suite[];
  image = "";
  constructor(private service: SuiteService,
    private router: Router,
    private data: DataShareService,
    private toastr: ToastrService,
    private title: PageTitleService) { }

  ngOnInit() {
    this.title.adminTitle = "Suite List";
    this.getSuites();
  }

  getSuites() {
    this.service.suitesList().subscribe(
      (response) => {
        this.suites = response;
        console.log(this.suites);
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "Error");
        if (err.error.message === 'No suites available') {
          this.suites = null;
        }
      }
    );
  }

  UpdateSuite(suite: Suite) {
    console.log(suite);
    this.data.suite = suite;
    this.router.navigate(['/admin/suites/edit-suite']);
  }

  ViewSuite(suite) {
    let suiteData = JSON.stringify(suite);
    localStorage.setItem('suiteView', suiteData);
    this.router.navigate(['/admin/suites/view-suite', suite.suiteId]);
  }

  DeleteSuite(id) {
    const numid = + (id);
    if (confirm('Are you sure to delete suite id: ' + id)) {
      this.service.deleteSuite(numid).subscribe(
        () => {
          console.log('res');
          const val = this.service.suiteCount.value - 1;
          this.service.suiteCount.next(val);
          this.toastr.success(`Suite id: ${id} deleted successfully`, "Success");
          this.getSuites();
        },
        (err) => {
          if (err.status == 200) {
            console.log('res in err');
            const val = this.service.suiteCount.value - 1;
            this.service.suiteCount.next(val);
            this.toastr.success(`Suite id: ${id} deleted successfully`, "Success");
            this.getSuites();
          } else {
            console.log(err);
            this.toastr.error(err.error.message, "Error");
          }
        }
      )
    }
  }

  getImage() {
    this.service.getImage("fb").subscribe((res) => {
      console.log(res.error.text);
    }, err => {
      /* console.log(err.error.text); */
      /*       ArrayBuffer = err.error.text;
            console.log(ArrayBuffer);
            let TYPED_ARRAY = new Uint8Array(ArrayBuffer);
            const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
            let base64String = btoa(STRING_CHAR);
            console.log(base64String);
            this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String); */
      console.log(this.image);
    })
  }

}
