import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RegisterService } from '../share/service/register.service';
import { Register, Country, City, State } from '../share/model/model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  alreadyExistedError = '';
  usernamevalidation = '';
  isalreadyExistedEmail = false;
  isalreadyExistedUser: boolean = false;
  emailexistError = '';
  extensionNumber = '';
  spin = false;
  countries: Country[] = [];
  cities: City[] = [];
  states: State[] = [];
  extensionNo: any;
  isUsername: boolean = false;
  organization: boolean = false;
  pwdNotMatch: boolean;

  register: Register = {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    password: null,
    passwordConfirm: null,
    mobilenumber: null,
    country: null,
    extensionNumber: null,
    state: null,
    city: null,
    location: null,
    role: 'ROLE_USER'
  };

  constructor(private service: RegisterService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getCountires();
  }

  checkPwd() {
    if (this.register.password !== this.register.passwordConfirm) {
      this.pwdNotMatch = true;
    } else
      this.pwdNotMatch = false;
  }

  getCountires() {
    this.service.getCountries().subscribe(
      (response) => {
        this.countries = response;
        this.states = [];
        this.cities = [];
        this.countries.sort((a, b) => {
          if (a.cname < b.cname) { return -1; }
          if (a.cname > b.cname) { return 1; }
          return 0;
        })
      },
      (err) => {
        this.toastr.error(err, 'Error');
      }
    );
  }

  Filter(name) {
    console.log(name)
    let number = this.countries.filter(v => v.cname == name);
    console.log(number);
    if (number.length !== 0) {
      this.extensionNo = number[0].phonecode;
      this.extensionNumber = this.extensionNo;
      this.getStates(number[0].cid);
    } else {
      this.toastr.warning('Please select country', 'Warning');
      this.states = [];
      this.cities = [];
    }
    this.register.state = 'null';
    this.register.city = 'null';
  }

  getStates(id: number) {
    console.log(id);
    this.service.getStates(id).subscribe(
      (response) => {
        console.log(response);
        this.states = response;

      },
      (err) => {
        console.log(err);

      }
    )
  }

  selectedState(name) {
    let number = this.states.filter(v => v.sname == name);
    console.log(name);
    if (number.length != 0) {
      this.getCities(number[0].sid);
    }
    this.register.city = 'null';

  }

  getCities(id: number) {
    this.service.getCities(id).subscribe(
      (response) => {
        console.log(response);
        this.cities = response;

      },
      (err) => {
        console.log(err);
      }
    )
  }

  isExisted() {

    if (this.register.username != null) {

      if (this.register.username.toLowerCase().includes('admin') || this.register.username.toLowerCase().includes('user') || this.register.username.toLocaleLowerCase().includes('root') || this.register.username.toLocaleLowerCase().includes('service') || this.register.username.toLowerCase().includes('ai30')) {
        this.usernamevalidation = 'User name does not allow ai3o, admin, user, root, service.';
        this.isUsername = true;
      }
      else {
        this.isUsername = false;
        this.usernamevalidation = null;
      }
    }

    this.service.isUserExist(this.register.username).subscribe(() => {
      this.alreadyExistedError = null;
      this.isalreadyExistedUser = false;
    },
      err => {
        if (err.status === 500) {
          this.alreadyExistedError = err.error.message;
          this.isalreadyExistedUser = true;
        }
      });
  }

  isEmailExisted() {
    this.service.isEmail(this.register.email).subscribe((res) => {
      this.emailexistError = '';
      this.isalreadyExistedEmail = false;
      return false;
    }, err => {
      if (err.status === 500) {
        this.emailexistError = err.error.message;
        this.isalreadyExistedEmail = true;
        return true;
      }
    });
  }

  paasAccount() {
    this.spin = true;
    this.register.extensionNumber = this.extensionNo;
    this.register.createdBy = this.register.username;
    console.log(this.register);
    if (!this.isalreadyExistedEmail) {
      this.service.Security(this.register).subscribe(
        () => {
          this.toastr.success("Email verification link has been sent to your registered email account.", 'Success');
          this.router.navigate(['/signin']);
        },
        (err) => {
          this.spin = false;
          console.log(err);
          if (err.status == 500 || err.status == 0) {
            this.toastr.error("Server is not responding", 'Error');
          }
        }
      );
    }
  }
}


