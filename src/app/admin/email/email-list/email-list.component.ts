import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { TenantListService } from '../../Admin-Share/tenant-list.service';
import { Register, emails } from 'src/app/share/model/model';
import { EmailService } from '../../Admin-Share/email.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {

  searchTerm: string;
  selected: boolean[] = [];
  selectedValue: emails[];
  users: Register[] = [];
  selectAllDeselectAll: boolean = true;
  oldMails: emails[];
  selectallchk;
  p = 1;

  constructor(
    public title: PageTitleService,
    private service: TenantListService,
    private router: Router,
    private toastr: ToastrService,
    private email: EmailService) { }

  ngOnInit() {
    this.title.adminTitle = "Email List";
    this.getRegisteredTenants();
    this.selectedValue = [];
  }

  getRegisteredTenants() {
    this.service.registerTenant().subscribe(
      (response) => {
        this.users = response;
        console.log(response);
        setTimeout(() => this.getchecked(), 1000);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getchecked() {
    this.oldMails = JSON.parse(localStorage.getItem('registerData')) || [];
    if (this.oldMails) {
      for (let i = 0; i < this.oldMails.length; i++) {
        this.selectallchk = ((document.getElementById(this.oldMails[i].username.toString()) as HTMLInputElement));
        this.selectallchk.checked = true;
      }
      this.selectedValue = this.oldMails;
    }
  }

  change(e: HTMLInputElement, user) {

    /* console.log(e);
    console.log(e.checked);
    console.log(user); */

    if (e.checked)
      this.selectedValue.push({ "email": user.email, "username": user.username });
    else {
      let index = this.selectedValue.findIndex(x => x.username == user.username)
      this.selectedValue.splice(index, 1);
      console.log(this.selectedValue);
    }

    console.log(this.selectedValue);

    if (this.users.length == this.selectedValue.length)
      this.selectAllDeselectAll = false;
    else
      this.selectAllDeselectAll = true;
  }

  selectAll() {
    for (let i = 0; i < this.users.length; i++) {
      /* if (this.users[i].role !== 'ROLE_ADMIN') { */
      this.selectedValue.push({ "email": this.users[i].email, "username": this.users[i].username });
      this.selected[i] = true;
      /*  } */
    }
    this.selectAllDeselectAll = !this.selectAllDeselectAll;
    console.clear();
    this.selectedValue = this.selectedValue.filter((item, index) =>
      this.selectedValue.indexOf(item) === index
    );
    console.log(this.selectedValue);
    console.log(this.selected);
  }

  DeSelectAll() {
    for (let i = 0; i < this.users.length; i++) {
      this.selectedValue.pop();
      this.selected[i] = false;
    }
    this.selectAllDeselectAll = !this.selectAllDeselectAll;
    console.clear();
    console.log(this.selectedValue);
    console.log(this.selected);
    setTimeout(() => this.getchecked(), 500);
  }

  next() {

    console.log(this.selectedValue);

    if (this.selectedValue.length == 0 && this.oldMails.length == 0) {
      this.toastr.warning("Please select atleast one user to send email", "Warning");
      return;
    }

    this.oldMails = JSON.parse(localStorage.getItem('registerData')) || [];

    console.log(this.oldMails);

    this.selectedValue.forEach(element => {
      this.oldMails.push({ "email": element.email, "username": element.username });
    });

    console.log(this.oldMails);

    const uniqueArray = this.oldMails.filter((ele, index) => {
      return index === this.oldMails.findIndex(obj => {
        return JSON.stringify(obj) === JSON.stringify(ele);
      });
    });

    console.log(uniqueArray);
    localStorage.setItem('registerData', JSON.stringify(uniqueArray));
    this.router.navigate(['admin/emails/mail-compose']);
  }

  key: string = 'country';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }

}
