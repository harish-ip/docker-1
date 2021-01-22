import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { mail } from 'src/app/share/model/model';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { EmailService } from 'src/app/admin/Admin-Share/email.service';
import { DataShareService } from 'src/app/share/service/data-share.service';

@Component({
  selector: 'app-client-email-compose',
  templateUrl: './client-email-compose.component.html',
  styleUrls: ['./client-email-compose.component.css']
})
export class ClientEmailComposeComponent implements OnInit, OnDestroy {

  selectedValue = [];
  registerView = [];
  totalCount = 0;
  mailcontent: mail;
  SelectedEmails: string[] = [];
  loading: boolean = false;
  getemail;
  indexval;

  constructor(private title: PageTitleService,
    private email: EmailService,
    private toastr: ToastrService,
    private router: Router,
    private data: DataShareService) { }

  ngOnInit() {
    this.title.isLoding = false;
    this.title.adminTitle = "Mail Compose";
    this.clearFields();
    this.registerView = JSON.parse(localStorage.getItem('registerData'));
    if (this.registerView) {
      this.selectedValue = this.registerView;
      this.totalCount = this.selectedValue.length;
    } else {
      this.selectedValue = [];
      this.totalCount = 0;
    }
    this.getSelectedEmails();
    this.getInitData();
  }

  clearFields() {
    this.mailcontent = {
      subject: '',
      body: ''
    };
  }

  getInitData() {
    if (this.email.emailData.subject)
      this.mailcontent.subject = this.email.emailData.subject;
    if (this.email.emailData.body)
      this.mailcontent.body = this.email.emailData.body;
  }


  getDeleteEmailDetails(index: number) {
    this.getemail = this.selectedValue[index]['email'];
    this.indexval = index;
  }

  deleteEmail() {
    this.selectedValue.splice(this.indexval, 1);
    this.totalCount = this.selectedValue.length;
    if (this.indexval > -1) {
      /*  this.registerView.splice(index, 1); */
      localStorage.removeItem('registerData');
      this.toastr.success('Email removed successfully', 'Success');
      localStorage.setItem('registerData', JSON.stringify(this.registerView));
      if (this.selectedValue.length == 0){
        this.clearFields();
        this.router.navigate(['clientadmin/emails/client-email-list']);
      }
    }
  }

  validations() {
    if (this.selectedValue == null || this.selectedValue.length == 0) {
      this.loading = false;
      this.toastr.warning('Please select atleast one user to send email', 'Warning');
      return false;
    }
    if (this.mailcontent.subject.trim().length == 0) {
      this.toastr.warning("Subject couldn't be empty", "Warning");
      this.loading = false;
      return false;
    } else if (this.mailcontent.body.trim().length == 0) {
      this.toastr.warning("Body couldn't be empty", "Warning");
      this.loading = false;
      return false;
    } else
      return true;
  }

  getSelectedEmails() {
    this.SelectedEmails = [];
    for (let i = 0; i < this.selectedValue.length; i++) {
      this.SelectedEmails[i] = this.selectedValue[i]['email'];
    }
    console.log(this.SelectedEmails);
  }

  ngOnDestroy() {
    this.emailDetails();
  }

  emailDetails() {
    console.log(this.mailcontent.subject);
    console.log(this.mailcontent.body);
    if (this.mailcontent.subject.length > 0)
      this.email.emailData.subject = this.mailcontent.subject;
    if (this.mailcontent.body.length > 0)
      this.email.emailData.body = this.mailcontent.body;
  }

  send() {
    console.clear();
    console.log(this.selectedValue);
    console.log(this.mailcontent);
    this.loading = true;
    if (this.validations()) {
      this.getSelectedEmails();
      this.mailcontent.body.trim();
      this.mailcontent.subject.trim();
      this.email.sendMail(this.mailcontent.subject, this.mailcontent.body, this.data.email.value, this.SelectedEmails).subscribe(
        (Response) => {
          this.loading = false;
          console.log(Response);
          this.selectedValue = null;
          this.totalCount = 0;
          this.clearFields();
          localStorage.removeItem('registerData');
          this.toastr.success("Your mail has been sent successfully", "Success");
          this.router.navigate(['clientadmin/emails/client-email-list']);
        },
        (err) => {
          this.loading = false;
          console.log(err);
          this.toastr.error(err.error.message, "Error");
        }
      );
    }
  }
}
