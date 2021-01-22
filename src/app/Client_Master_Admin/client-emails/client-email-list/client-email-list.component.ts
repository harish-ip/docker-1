import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Register, emails } from 'src/app/share/model/model';
import { RegisterService } from 'src/app/share/service/register.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'app-client-email-list',
  templateUrl: './client-email-list.component.html',
  styleUrls: ['./client-email-list.component.css']
})
export class ClientEmailListComponent implements OnInit {

  searchTerm: string;
  selected: boolean[] = [];
  selectedValue: emails[];
  users: Register[] = [];
  selectAllDeselectAll: boolean = true;
  oldMails: emails[];
  selectallchk;
  p = 1;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private reg: RegisterService,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.getRegisteredusers();
    this.selectedValue = [];
  }

  getRegisteredusers() {
    this.reg.getAllUsersBasedOnClientMaster(this.auth.decoded.sub).subscribe(
      (response) => {
        console.log(response);
        this.users = response;
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
      this.oldMails = JSON.parse(localStorage.getItem('registerData')) || [];
      console.log(this.oldMails);
      let index1 = this.oldMails.findIndex(x => x.username == user.username)
      this.oldMails.splice(index1, 1);
      console.log(this.oldMails);
      localStorage.setItem('registerData', JSON.stringify(this.oldMails));
    }

    console.log(this.selectedValue);

    if (this.users.length == this.selectedValue.length)
      this.selectAllDeselectAll = false;
    else
      this.selectAllDeselectAll = true;
  }

  selectAll() {
    for (let i = 0; i < this.users.length; i++) {
      /*   if (this.users[i].role !== 'ROLE_CLIENT_MASTER') { */
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
  }

  /*  selectAll() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].role !== 'ROLE_ADMIN') {
        this.selectedValue.push({ "email": this.users[i].email, "username": this.users[i].username });
        this.selected[i] = true;
      }
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
 */

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
    this.router.navigate(['clientadmin/emails/client-email-compose']);
  }

  key: string = 'country';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }

}
