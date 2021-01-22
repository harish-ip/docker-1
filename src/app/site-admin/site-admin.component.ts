import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../share/service/data-share.service';

@Component({
  selector: 'app-site-admin',
  templateUrl: './site-admin.component.html',
  styleUrls: ['./site-admin.component.css']
})
export class SiteAdminComponent implements OnInit {

  constructor(private dataShare: DataShareService) {
    this.dataShare.mainLoading.next(false);
   }

  ngOnInit() {
  }

}
