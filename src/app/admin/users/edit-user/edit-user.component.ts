import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Register, State, City, ClientMasterList } from 'src/app/share/model/model';
import { TenantListService } from '../../Admin-Share/tenant-list.service';
import { RegisterService } from 'src/app/share/service/register.service';
import { DataShareService } from 'src/app/share/service/data-share.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  errBoolean = false;
  validations = false;
  ErrMsg: string = null;
  alreadyExisted: any;
  isalreadyExisted: boolean;
  emailexist: string;
  loading: boolean = false;
  disableBtn: boolean = false;
  email: string;
  pwdNotMatch: boolean;
  phone_code = '';
  location;
  register: Register = {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    password: null,
    passwordConfirm: null,
    mobilenumber: null,
    country: null,
    state: null,
    city: null,
    extensionNumber: null,
    clientmaster: null,
    siteadmin: null,
    siteuser: null,
    organizationName: null,
    location: null,
  };

  countries = [];
  states: State[] = [];
  cities: City[] = [];
  clientList: ClientMasterList[] = [];
  siteAdminList = [];

  extensionNumber: any;
  localstorageExtensionNo: string;

  enableClientMaster = true;
  enableSiteAdmin = true;
  enableOrgName = false;

  constructor(private service: TenantListService,
    private router: Router,
    private registerservice: RegisterService,
    private data: DataShareService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    // let registerData = JSON.parse(localStorage.getItem('email'));
    if (this.data.anyData) {
      this.email = this.data.anyData['email'];
    }
    let registerData: Register = this.data.anyData;
    console.log(registerData);
    this.register = registerData;
    if (registerData) {
      this.register.password = registerData["passwordConfirm"];
      this.getCountires();
      this.roleChange(this.register.role);
    }
  }

  checkPwd() {
    if (this.register.password !== this.register.passwordConfirm) {
      this.pwdNotMatch = true;
    } else
      this.pwdNotMatch = false;
  }

  changeStateCity() {
    let registerData: Register = JSON.parse(sessionStorage.getItem('UserDetails'));
    if (this.register.country !== null && (registerData.country != this.register.country)) {
      this.register.state = null;
      this.register.city = null;
    }
  }

  Filter(value: String) {
    let number = this.countries.filter(v => v.cname == value);
    console.log(number);
    /*  this.register.location = ''; */
    this.changeStateCity();
    if (number.length !== 0) {
      this.getStates(number[0].cid);
      this.phone_code = number[0].phonecode;
      this.extensionNumber = this.phone_code;
      console.log(this.phone_code);
      console.log(this.register);
    }
    else
      this.toastr.warning('Please select country', 'Warning');
  }

  getCountires() {
    this.registerservice.getCountries().subscribe(
      (response) => {
        this.countries = response;
        this.states = [];
        this.cities = [];
        console.log(this.countries);
        this.Filter(this.register.country);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getStates(id: number) {
    console.log(id);
    this.registerservice.getStates(id).subscribe(
      (response) => {
        console.log(response);
        this.states = response;
        this.cities = [];
        const id = this.states.filter(v => v.sname == this.register.state);
        console.log(id);
        if (id.length != 0) {
          this.getCities(id[0].sid);
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getCities(id: number) {
    this.registerservice.getCities(id).subscribe(
      (response) => {
        console.log(response);
        this.cities = response;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  selectedState(name) {
    let number = this.states.filter(v => v.sname == name);
    console.log(name);
    this.getCities(number[0].sid);
  }

  isExisted() {
    this.registerservice.isUserExist(this.register.username).subscribe(() => {
      this.alreadyExisted = null;
      this.isalreadyExisted = false;
    },
      err => {
        if (err.status == 500) {
          this.alreadyExisted = err.error.message;
          this.isalreadyExisted = true;
        }
      });
  }

  isEmailExisted() {
    this.registerservice.isEmail(this.register.email).subscribe((res) => {
      /* console.log(this.register.email+"  "+ res) */
      this.emailexist = '';
      this.isalreadyExisted = false;
      return false;
    }, err => {
      if (err.status === 500) {
        this.emailexist = err.error.message;
        this.isalreadyExisted = true;
        return true;
      }
    });
  }

  roleChange(role: string) {
    console.log(role);
    if (role == "ROLE_SITE_ADMIN") {
      this.enableClientMaster = false;
      this.enableSiteAdmin = true;
      this.enableOrgName = true;
      this.getClient();
    } else if (role == "ROLE_SITE_USER") {
      this.enableClientMaster = false;
      this.enableSiteAdmin = false;
      this.enableOrgName = true;
      this.getClient();
    } else if (role == 'ROLE_USER') {
      this.enableOrgName = true;
      this.enableClientMaster = true;
      this.enableSiteAdmin = true;
      this.getClient();
    } else if (role == 'ROLE_CLIENT_MASTER') {
      this.enableClientMaster = true;
      this.enableSiteAdmin = true;
      this.register.clientmaster = null;
      this.register.siteadmin = null;
      this.enableOrgName = false;
    }
    else {
      this.enableOrgName = false;
    }
  }

  getClient() {
    this.registerservice.getUsersByRole("ROLE_CLIENT_MASTER").subscribe(res => {
      console.log(res);
      this.clientList = res;
      if (this.register.clientmaster) {
        this.getSiteAdmin(this.register.clientmaster);
      }
    }, err => {
      console.log(err);
    })
  }

  seletedClientMaster(client_master: string) {
    console.log(client_master);
    this.enableSiteAdmin = false;
    this.getSiteAdmin(client_master);
  }

  getSiteAdmin(client_master) {
    this.registerservice.getSiteAdmins(client_master).subscribe(res => {
      console.log(res);
      this.siteAdminList = res;
    }, err => {
      console.log(err);
    })
  }

  updateRegisterUsers() {
    this.loading = true;
    this.disableBtn = true;
    this.register.extensionNumber = this.extensionNumber;
    console.clear();
    console.log(this.register);
    console.log(this.register._id);
    //this.register.userId = +this.register._id.$numberLong;
    console.log(this.register.userId);
    this.service.editRegisterTenant(this.register).subscribe(
      (res) => {
        console.log(res);
        console.log(this.register);
        this.loading = false;
        this.disableBtn = false;
        this.toastr.success('User updated successfully', 'Success');
        console.log(this.phone_code);
        console.log(this.extensionNumber);
        console.log("this.data.anyData['email'] ", this.email);
        console.log("this.register.email ", this.register.email);
        if (this.register.email != this.email) {
          this.toastr.success('Email verification link sent to ' + this.register.email, 'Success');
          this.data.anyData = null;
        }
        this.router.navigate(['/admin/users/users-list']);
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.disableBtn = false;
      }
    )
  }
}