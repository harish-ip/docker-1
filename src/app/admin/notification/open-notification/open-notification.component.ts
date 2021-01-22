import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contactus } from 'src/app/share/model/model';
import { RegisterService } from 'src/app/share/service/register.service';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/share/service/data-share.service';

@Component({
  selector: 'app-open-notification',
  templateUrl: './open-notification.component.html',
  styleUrls: ['./open-notification.component.css']
})
export class OpenNotificationComponent implements OnInit {

  notification: Contactus;
  notifications: Contactus[];
  isSingleNotification = true;
  isReply = false;
  index = 0;
  maxindex;
  replymsg;
  loading: boolean = false;

  constructor(private reg: RegisterService,
    private router: Router,
    private toaster: ToastrService,
    private data: DataShareService) { }

  ngOnInit() {
    this.notification = this.reg.notification;
    console.log(this.notification);
    if (this.data.notificationDataList.value.length != 0) {
      this.index = this.data.notificationDataList.value.findIndex(a => a.notificationId == this.notification.notificationId);
      console.log(this.index);
      this.maxindex = this.data.notificationDataList.value.length - 1;
    }
  }

  getNotifications() {
    if(this.index != this.maxindex){
      const i = this.index + 1;
      this.notification = this.data.notificationDataList.value[i];
      this.index = i;
      if(!this.notification.read){
        this.openEmail(this.notification.notificationId);
      }
    }
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

  back() {
    this.router.navigate(['/admin/notifications/notification-List']);
  }

  reply() {
    this.isReply = true;
  }

  sendreply() {
    console.clear();
    this.replymsg = ((document.getElementById("reply") as HTMLInputElement).value);
    if (this.replymsg.length == 0) {
      this.toaster.warning('Reply message is required', 'Warning');
      this.loading = false;
      return;
    }
    this.loading = true;
    this.reg.notification.replymsg = this.replymsg;
    console.log(this.reg.notification);

    this.reg.replyNotification(this.reg.notification).subscribe(
      (response) => {
        console.log(response);
        this.loading = false;
        this.toaster.success(`Message sent successfully`, 'Success');
        this.router.navigate(['/admin/notifications/sent-email']);
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }
}
