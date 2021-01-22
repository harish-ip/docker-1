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
  selector: 'app-edit-client-user',
  templateUrl: './edit-client-user.component.html',
  styleUrls: ['./edit-client-user.component.css']
})
export class EditClientUserComponent implements OnInit {
  clientMasterName: string = null;
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
    role: null,
    organizationName: null,
    state: null,
    city: null,
    location: null,
    siteadmin: null,
  };

  enableRow = false;
  enableClientMaster = false;
  enableSiteAdmin = true;
  enableSiteUser = false;
  loading: boolean = false;
  disableBtn: boolean = false;
  email: string;
  localstorageExtensionNo: string;

  constructor(private reg: RegisterService,
    private toastr: ToastrService,
    private service: TenantListService,
    private title: PageTitleService,
    private auth: AuthenticationService,
    private router: Router,
    private data: DataShareService) { }

  ngOnInit() {
    this.title.adminTitle = "Edit User";
    this.clientMasterName = this.auth.decoded.sub;
    console.log(this.clientMasterName);
    if (this.data.anyData) {
      this.email = this.data.anyData['email'];
    }
    let registerData: Register = this.data.anyData;
    console.log(registerData);
    this.register = registerData;

    if (registerData) {
      if (this.register.role == "ROLE_SITE_ADMIN")
        this.clientMasterName = this.auth.decoded.sub;
      else if (this.register.role == "ROLE_SITE_USER")
        this.clientMasterName = this.register.siteadmin;
      this.register.password = registerData["passwordConfirm"];
      this.getCountries();
      this.roleChange(this.register.role);

    }

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
        console.log(this.countries);
        this.Filter(this.register.country);
        // console.log(this.countries);
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
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
    this.changeStateCity();
    if (number.length !== 0) {
      this.getStates(number[0].cid);
      this.phone_code = number[0].phonecode;
      this.extensionNumber = this.phone_code;
      console.log(this.phone_code);
      /*  this.localstorageExtensionNo =  this.extensionNumber; */
      /*  if (number.length != 0) {
         this.getStates(number[0].id);
       } */
      // localStorage.setItem('extension', '+' + this.extensionNumber);
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
    } else {
      this.enableRow = false;
      this.enableOrgName = true;
    }
  }

  getsite() {
    this.reg.getUsersByRole("ROLE_CLIENT_MASTER").subscribe(res => {
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
  }

  updateClientUsers() {
    this.loading = true;
    this.disableBtn = true;
    this.register.extensionNumber = this.extensionNumber;
    //this.register.userId = +this.register._id.$numberLong;
    console.log(this.register);
    this.service.editRegisterTenant(this.register).subscribe(
      (res) => {
        console.log(res);

        this.loading = false;
        this.disableBtn = false;
        this.toastr.success('User updated successfully', 'Success');
        console.log("this.data.anyData['email'] ", this.email);
        console.log("this.register.email ", this.register.email);
        if (this.register.email != this.email) {
          this.toastr.success('Email verification link sent to ' + this.register.email, 'Success');
          this.data.anyData = null;
        }
        this.router.navigate(['/clientadmin/users/client-user-list']);
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.disableBtn = false;
      }
    )
  }
}
