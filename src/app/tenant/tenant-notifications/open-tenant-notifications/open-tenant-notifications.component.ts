import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contactus } from 'src/app/share/model/model';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { RegisterService } from 'src/app/share/service/register.service';

@Component({
  selector: 'app-open-tenant-notifications',
  templateUrl: './open-tenant-notifications.component.html',
  styleUrls: ['./open-tenant-notifications.component.css']
})
export class OpenTenantNotificationsComponent implements OnInit {

  notification: Contactus;
  notificationData: Contactus[];
  index = 0;
  maxindex;
  isNotification = false;

  constructor(private reg: RegisterService,
    private data: DataShareService,
    private router: Router) { }

  ngOnInit() {
    this.notification = this.reg.notification;
    if (this.data.notificationDataList.value.length != 0) {
      this.index = this.data.notificationDataList.value.findIndex(a => a.notificationId == this.notification.notificationId);
      console.log(this.index);
      this.maxindex = this.data.notificationDataList.value.length - 1;
    }
  }

  back() {
    this.router.navigate(['/tenant/notifications/tenant-notifications-list']);
  }

  getNotifications() {
    if (this.index != this.maxindex) {
      const i = this.index + 1;
      this.notification = this.data.notificationDataList.value[i];
      this.index = i;
      if (!this.notification.read) {
        this.openClientNotification(this.notification.notificationId);
      }
    }
  }

  openClientNotification(notificationId) {
    console.log("notificationId", notificationId);
    this.reg.clientOpenNotification(notificationId).subscribe(
      (Response) => {
        console.log(Response);
        this.reg.notification = Response;
        this.reg.clickClientNotication.next(true);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
