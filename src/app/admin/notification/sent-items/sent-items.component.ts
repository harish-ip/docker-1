import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Contactus } from 'src/app/share/model/model';
import { RegisterService } from 'src/app/share/service/register.service';
import { DataShareService } from 'src/app/share/service/data-share.service';
declare var $;

@Component({
  selector: 'app-sent-items',
  templateUrl: './sent-items.component.html',
  styleUrls: ['./sent-items.component.css']
})
export class SentItemsComponent implements OnInit {

  emails: [];
  sentItems: Contactus[] = [];
  deleteSentMails: Contactus;
  sub;
  msg;
  searchTerm: string;
  p = 1;
  constructor(private reg: RegisterService,
    private data: DataShareService,
    private router: Router,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.getSentMails();
  }

  getdeletesentMails(sent: Contactus) {
    this.deleteSentMails = sent;
    this.sub = this.deleteSentMails.subject;
    this.msg = this.deleteSentMails.message;
  }

  mail(i: number) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip({
        show: true,
        sanitize: false,
        sanitizeFn: content => content
      }).hover(function () {
        // console.log($(this));
      })
    })
  }

  getSentMails() {
    this.reg.isSentMails(this.data.email.value).subscribe(
      (Response) => {
        console.log(Response);
        this.sentItems = Response;
        this.data.notificationSentList.next([]);
        this.data.notificationSentList.next(Response);
        if (this.sentItems.length <= 10)
          this.p = 1;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openSentMails(id) {
    this.reg.openSentMail(id).subscribe(
      (response) => {
        console.log(response);
        this.reg.sentItems = response;
        this.router.navigate(['/admin/notifications/open-sent-items']);
      },
      (err) => {
        console.log(err);
      }
    );
    $('[data-toggle="tooltip"]').tooltip('hide')
  }

  DeleteSentMails(id) {
    this.reg.getDeleteSentMail(id).subscribe(
      (response) => {
        console.log(response);
        this.reg.sentItems = response;
      },
      (err) => {
        if (err.status == 200) {
          this.toaster.success("Sent mail deleted successfully", 'Success');
          this.getSentMails();
        }
        console.log(err);
      }
    )

  }



}
