import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Register, Country, State, City, ClientMasterList } from 'src/app/share/model/model';
import { RegisterService } from 'src/app/share/service/register.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { TenantListService } from '../../Admin-Share/tenant-list.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

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
  clientList: ClientMasterList[] = [];
  siteAdminList = [];
  isUsername: boolean = false;
  organization: boolean = false;
  username: string;
  phone_code = '';
  pwdNotMatch: boolean;

  /* div enable based on role */
  enableClientMaster = true;
  enableSiteAdmin = true;
  enableOrgName = false;


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
    role: "ROLE_CLIENT_MASTER",
    organizationName: null,
    state: null,
    city: null,
    location: null,
    clientmaster: null,
    siteadmin: null
  };

  constructor(private service: RegisterService,
    private router: Router,
    private toastr: ToastrService,
    public title: PageTitleService,
    private tenService: TenantListService,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.title.adminTitle = "Create User";
    this.username = this.auth.decoded.sub;
    this.getCountries();
    /*  this.register.site_admin = null; */
  }
  checkPwd() {
    if (this.register.password !== this.register.passwordConfirm) {
      this.pwdNotMatch = true;
    } else
      this.pwdNotMatch = false;
  }
  getCountries() {
    this.service.getCountries().subscribe(
      (response) => {
        console.log(response);
        this.countries = response;
        this.states = [];
        this.cities = [];
        this.countries.sort((a, b) => {
          if (a.cname < b.cname) { return -1; }
          if (a.cname > b.cname) { return 1; }
          return 0;
        })
        // console.log(this.countries);
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  Filter(name) {
    console.log(name)
    let number = this.countries.filter(v => v.cname == name);
    console.log(number);
    if (number.length !== 0) {
      this.getStates(number[0].cid);
      this.phone_code = number[0].phonecode;
      this.extensionNumber = this.phone_code;
    } else
      this.toastr.warning('Please select country', 'Warning');
  }

  getStates(id: number) {
    console.log(id);
    this.service.getStates(id).subscribe(
      (response) => {
        console.log(response);
        this.states = response;
        this.cities = [];
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

  orgName(value) {
    console.log(value);
    if (value == "org") {
      this.organization = true;
    } else if (value == "individual") {
      this.organization = false;
    }
  }

  isExisted() {
    if (this.register.username != null) {
      if (this.register.username.toLocaleLowerCase().includes('admin') || this.register.username.toLocaleLowerCase().includes('user') || this.register.username.toLocaleLowerCase().includes('root') || this.register.username.toLocaleLowerCase().includes('service')) {
        this.usernamevalidation = 'User name does not allow admin, user, root, service.';
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

  roleChange(role: string) {
    console.log(role);
    if (role == "ROLE_SITE_ADMIN") {
      this.register.organizationName = '';
      this.register.siteadmin = null;
      this.enableClientMaster = false;
      this.enableSiteAdmin = true;
      this.enableOrgName = true;

      this.getClient();
    } else if (role == "ROLE_SITE_USER") {
      this.register.organizationName = '';
      /* this.register.client_master = '';
      this.register.site_admin = ''; */
      this.enableClientMaster = false;
      this.enableSiteAdmin = false;
      this.enableOrgName = true;
      this.getClient();
    } else if (role == 'ROLE_USER') {
      this.register.organizationName = '';
      this.register.clientmaster = null;
      this.register.siteadmin = null;
      this.enableOrgName = true;
      this.enableClientMaster = true;
      this.enableSiteAdmin = true;
    } else if (role == 'ROLE_CLIENT_MASTER') {
      this.enableClientMaster = true;
      this.enableSiteAdmin = true;
      this.register.clientmaster = null;
      this.register.siteadmin = null;
      this.enableOrgName = false;
      this.register.organizationName = null;
    }
    else {
      this.enableOrgName = false;
    }
  }

  getClient() {
    this.service.getUsersByRole("ROLE_CLIENT_MASTER").subscribe(res => {
      console.log(res);
      this.clientList = res;
    }, err => {
      console.log(err);
    })
  }

  seletedClientMaster(client_master: string) {
    if (this.register.role == 'ROLE_SITE_ADMIN') {
      this.enableSiteAdmin = true;
      const orgName = this.clientList.filter(a => a.username == client_master);
      if (orgName.length != 0) {
        this.register.organizationName = orgName[0].organizationName;
      }
    } else {
      console.log(client_master);
      this.enableSiteAdmin = false;
      const orgName = this.clientList.filter(a => a.username == client_master);
      if (orgName.length != 0) {
        this.register.organizationName = orgName[0].organizationName;
      }
      this.getSiteAdmin(client_master);
    }
  }

  getSiteAdmin(client_master) {
    this.service.getSiteAdmins(client_master).subscribe(res => {
      console.log(res);
      this.siteAdminList = res;
    }, err => {
      console.log(err);
    })
  }

  paasAccount() {
    this.spin = true;
    this.register.extensionNumber = this.extensionNumber;
    this.register.createdBy = this.username;
    console.log(this.register);
    if (!this.isalreadyExistedEmail) {
      this.service.Security(this.register).subscribe(
        () => {
          this.spin = false;
          this.toastr.success("User created successfully", 'Success');
          const val = this.tenService.tenantsCount.value + 1;
          this.tenService.tenantsCount.next(val);
          this.toastr.success('Email verification link sent to ' + this.register.email, 'Success');
          this.router.navigate(['/admin/users']);
        },
        (err) => {
          this.spin = false;
          if (err.status == 500) {
            this.toastr.error("Server is not responding", 'Error');
          }
        }
      );
    }
  }

}