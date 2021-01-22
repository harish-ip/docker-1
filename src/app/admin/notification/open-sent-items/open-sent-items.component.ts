import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contactus } from 'src/app/share/model/model';
import { RegisterService } from 'src/app/share/service/register.service';
import { DataShareService } from 'src/app/share/service/data-share.service';

@Component({
  selector: 'app-open-sent-items',
  templateUrl: './open-sent-items.component.html',
  styleUrls: ['./open-sent-items.component.css']
})

export class OpenSentItemsComponent implements OnInit {
  emails: [];
  sentitems: Contactus;
  sentitemsIndex: Contactus[];
  isSinglesentItem = true;
  index = 0;
  maxindex;

  constructor(private reg: RegisterService,
    private data: DataShareService,
    private router: Router) { }

  ngOnInit() {
    this.sentitems = this.reg.sentItems;
    console.log(this.sentitems);
    if (this.data.notificationSentList.value.length != 0) {
      this.index = this.data.notificationSentList.value.findIndex(a => a.id === this.sentitems.id);
      console.log("index", this.index);
      this.maxindex = this.data.notificationSentList.value.length - 1;
    }
  }

  getSentItems() {
    if (this.index != this.maxindex) {
      const i = this.index + 1;
      this.sentitems = this.data.notificationSentList.value[i];
      this.index = i;
      // console.log(this.index, this.maxindex);
      // console.log(this.sentitems);
      /* if(!this.sentitems.read){
        this.openSentMails(this.sentitems.notificationId);
      } */
    }
  }

  openSentMails(id) {
    this.reg.openSentMail(id).subscribe(
      (response) => {
        console.log(response);
        this.reg.sentItems = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  back() {
    this.router.navigate(['/admin/notifications/sent-email']);
  }

}
