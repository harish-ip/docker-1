import { Component, OnInit } from '@angular/core';
import { Register, Country, City, State, SiteAdminList } from 'src/app/share/model/model';
import { RegisterService } from 'src/app/share/service/register.service';
import { ToastrService } from 'ngx-toastr';
import { TenantListService } from 'src/app/admin/Admin-Share/tenant-list.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/share/service/data-share.service';

@Component({
  selector: 'app-create-siteadmin-user',
  templateUrl: './create-siteadmin-user.component.html',
  styleUrls: ['./create-siteadmin-user.component.css']
})
export class CreateSiteadminUserComponent implements OnInit {

  username: string;
  alreadyExistedError = '';
  usernamevalidation = '';
  isalreadyExistedEmail = false;
  isalreadyExistedUser: boolean = false;
  emailexistError = '';
  isUsername: boolean = false;
  countries: Country[] = [];
  cities: City[] = [];
  states: State[] = [];
  siteAdminList: SiteAdminList[] = [];
  siteUserList = [];
  extensionNumber = '';
  phone_code = '';
  spin = false;
  enableOrgName = true;
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
    role: "ROLE_SITE_USER",
    organizationName: this.auth.organizationName.value,
    state: null,
    city: null,
    location: null,
    siteadmin: null
  };

  enableRow = false;
  enableClientMaster = false;
  enableSiteAdmin = true;
  enableSiteUser = false;

  constructor(private reg: RegisterService,
    private toastr: ToastrService,
    private tenService: TenantListService,
    private title: PageTitleService,
    private auth: AuthenticationService,
    private router: Router,
    private datashare: DataShareService) { }

  ngOnInit() {
    this.title.adminTitle = "Create User";
    this.username = this.auth.decoded.sub;
    this.getCountries();
  }


  checkPwd() {
    if (this.register.password !== this.register.passwordConfirm) {
      this.pwdNotMatch = true;
    } else
      this.pwdNotMatch = false;
  }

  getCountries() {
    this.reg.getCountries().subscribe(
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
    this.reg.getStates(id).subscribe(
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
    this.reg.getCities(id).subscribe(
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
      if (this.register.username.toLocaleLowerCase().includes('admin') || this.register.username.toLocaleLowerCase().includes('user') || this.register.username.toLocaleLowerCase().includes('root') || this.register.username.toLocaleLowerCase().includes('service')) {
        this.usernamevalidation = 'User name does not allow admin, user, root, service.';
        this.isUsername = true;
      }
      else {
        this.isUsername = false;
        this.usernamevalidation = null;
      }
    }

    this.reg.isUserExist(this.register.username).subscribe(() => {
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
    this.reg.isEmail(this.register.email).subscribe((res) => {
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
    if (role == "ROLE_SITE_USER") {

      this.enableRow = true;
      this.enableSiteAdmin = false;
      this.enableSiteUser = false;
      this.getsite();
    } else if (role == "ROLE_SITE_ADMIN") {
      this.register.organizationName = '';
      this.enableSiteAdmin = true;
      this.register.siteadmin = null;
    }
    else {
      this.enableRow = false;
      this.enableOrgName = true;
    }
  }

  getsite() {
    this.reg.getUsersByRole("ROLE_SITE_ADMIN").subscribe(res => {
      console.log(res);
      this.siteAdminList = res;
    }, err => {
      console.log(err);
    })
  }

  seletedSiteAdmin(site_admin: string) {
    console.log(site_admin);
    const orgName = this.siteAdminList.filter(a => a.username == site_admin);
    if (orgName.length != 0) {
      this.register.organizationName = orgName[0].organizationName;
    }
    /* this.getSiteUseronSiteAdmin(site_admin); */
  }

  /* getSiteUseronSiteAdmin(site_admin) {
    
  } */

  paasAccount() {
    this.spin = true;
    this.register.extensionNumber = this.extensionNumber;
    this.register.createdBy = this.username;
	this.register.username = this.register.email;
    // console.log(this.register);
    if (!this.isalreadyExistedEmail) {
      this.register.clientmaster = this.datashare.userdetails.value.clientmaster;
      this.register.siteadmin = this.datashare.userdetails.value.username;
      this.reg.Security(this.register).subscribe(
        () => {
          this.spin = false;
          this.toastr.success("User created successfully", 'Success');
          const val = this.tenService.tenantsCount.value + 1;
          this.tenService.tenantsCount.next(val);
          this.toastr.success('Email verification link sent to ' + this.register.email, 'Success');
          this.router.navigate(['/siteadmin/users/siteadmin-user-list']);
        },
        (err) => {
          this.spin = false;
          if (err.status == 200) {

          } else if (err.status == 500) {
            this.toastr.error("Server is not responding", 'Error');
          }
        }
      );
    }
  }
}
