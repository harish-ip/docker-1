import { Component, OnInit } from '@angular/core';
import { Contactus } from 'src/app/share/model/model';
import { RegisterService } from 'src/app/share/service/register.service';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $;

@Component({
  selector: 'app-site-admin-sent-items',
  templateUrl: './site-admin-sent-items.component.html',
  styleUrls: ['./site-admin-sent-items.component.css']
})
export class SiteAdminSentItemsComponent implements OnInit {

  siteSentItems: Contactus[] = [];
  deleteClientSentMails: Contactus;
  sub;
  msg;
  searchTerm: string;
  p = 1;
  constructor(private reg: RegisterService,
    private data: DataShareService,
    private router: Router,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.getClientSentMails();
  }

  getdeletesentMails(sent: Contactus) {
    this.deleteClientSentMails = sent;
    this.sub = this.deleteClientSentMails.subject;
    this.msg = this.deleteClientSentMails.message;
  }


  mail(i: number) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip({
        show: true,
        sanitize: false,
        sanitizeFn: content => content
      }).hover(function () {
        console.log($(this));
      })
    })
  }

  getClientSentMails() {
    this.reg.isSentMails(this.data.email.value).subscribe(
      (Response) => {
        console.log(Response);
        this.siteSentItems = Response;
        this.data.notificationSentList.next([]);
        this.data.notificationSentList.next(Response);
        if (this.siteSentItems.length <= 10)
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
        this.router.navigate(['/siteadmin/notifications/open-site-admin-sent-items']);
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
          this.getClientSentMails();
        }
        console.log(err);
      }
    )
  }

}
