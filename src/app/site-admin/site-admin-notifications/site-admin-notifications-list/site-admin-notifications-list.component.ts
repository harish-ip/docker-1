import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Contactus } from 'src/app/share/model/model';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { RegisterService } from 'src/app/share/service/register.service';
import { DataShareService } from 'src/app/share/service/data-share.service';

@Component({
  selector: 'app-site-admin-notifications-list',
  templateUrl: './site-admin-notifications-list.component.html',
  styleUrls: ['./site-admin-notifications-list.component.css']
})
export class SiteAdminNotificationsListComponent implements OnInit {
  searchTerm: string;
  notifications: Contactus[] = [];
  notificationDetails: Contactus;
  sub;
  msg;
  p = 1;

  constructor(private title: PageTitleService,
    private reg: RegisterService,
    private data: DataShareService,
    private router: Router,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.reg.clickClientNotication.next(true);
    this.title.clientMasterTitle = "Notification List";
    this.getNotificationsList();
  }

  deleteClientnotiDetails(notificationdata: Contactus) {
    this.notificationDetails = notificationdata;
    this.sub = notificationdata.subject;
    this.msg = notificationdata.message;
  }

  getNotificationsList() {
    this.reg.clientNotifications(this.data.email.value).subscribe(
      (Response) => {
        console.log(Response);
        this.notifications = Response;
        this.data.notificationDataList.next([]);
        this.data.notificationDataList.next(Response);
        if (this.notifications.length <= 10)
          this.p = 1;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openClientNotification(notificationId: number) {
    console.log('notId' + notificationId);
    this.reg.clientOpenNotification(notificationId).subscribe(
      (Response) => {
        console.log(Response);
        this.reg.notification = Response;
        this.reg.clickClientNotication.next(true);
        this.router.navigate(['/siteadmin/notifications/open-site-admin-notifications']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  DeleteClientNotification(notificationId) {
    console.log('notificationId is ' + notificationId);
    this.reg.deleteClientNotifications(notificationId).subscribe(
      (response) => {
        console.log(response);
        this.reg.clickClientNotication.next(true);
      },
      (err) => {
        if (err.status == 200) {
          this.toaster.success("Notification deleted successfully", 'Success');
          this.reg.clickClientNotication.next(true);
          this.getNotificationsList();
        }
        console.log(err);
      }
    )
  }
}
