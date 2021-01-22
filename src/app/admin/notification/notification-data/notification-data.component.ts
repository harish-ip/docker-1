import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contactus } from 'src/app/share/model/model';
import { RegisterService } from 'src/app/share/service/register.service';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/share/service/data-share.service';

@Component({
  selector: 'app-notification-data',
  templateUrl: './notification-data.component.html',
  styleUrls: ['./notification-data.component.css']
})
export class NotificationDataComponent implements OnInit {

  notification: Contactus[] = [];
  deletenotification: Contactus;
  sub;
  msg;
  notificationid;
  searchTerm: string;
  p = 1;

  constructor(private reg: RegisterService,
    private router: Router,
    private toaster: ToastrService,
    private data: DataShareService) { }

  ngOnInit() {
    this.reg.clickNotification.next(true);
    this.getNotifications();
  }

  getdeletenotiDetails(notification: Contactus) {
    this.deletenotification = notification;
    this.sub = notification.subject;
    this.msg = notification.message;
  }

  getNotifications() {
    this.reg.isEmailData().subscribe(
      (response) => {
        console.log(response);
        this.notification = response;
        this.data.notificationDataList.next([]);
        this.data.notificationDataList.next(response);
        if (this.notification.length <= 10)
          this.p = 1;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openEmail(notificationId: number) {
    console.log('notificationId is ' + notificationId);
    this.reg.openNotification(notificationId).subscribe(
      (response) => {
        console.log(response);
        this.reg.notification = response;
        this.reg.clickNotification.next(true);
        this.router.navigate(['/admin/notifications/open-notification']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  DeleteNotification(notificationId: number) {
    console.log('notificationId is ' + notificationId);
    this.reg.deleteNotification(notificationId).subscribe(
      (response) => {
        console.log(response);
        this.reg.notification = response;
        this.reg.clickNotification.next(true);
      },
      (err) => {
        if (err.status == 200) {
          this.toaster.success("Notification deleted successfully", 'Success');
          this.getNotifications();
        }
        console.log(err);
      }
    );
  }
}
