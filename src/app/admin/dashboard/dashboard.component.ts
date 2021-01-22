import { Component, OnInit, HostListener } from '@angular/core';

import { PageTitleService } from 'src/app/share/service/page-title.service';
import { ProductService } from '../Admin-Share/product.service';
import { CouponService } from '../Admin-Share/coupon.service';
import { TenantListService } from '../Admin-Share/tenant-list.service';
import { SuiteService } from '../Admin-Share/suite.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { RegisterService } from 'src/app/share/service/register.service';
import { ToastrService } from 'ngx-toastr';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';
import { Register, Product } from 'src/app/share/model/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  imgName: string = '';
  counts = {};
  location;
  role;
  userimage: any;
  imgprev: boolean = false;
  userdetails: any;
  comapnyUser: any;
   clientadmins = [];
  siteadmins: Register[] = [];
  siteusers: Register[] = [];
  roleusers: Register[] = [];
  clientAdminname: string;
  token: string = '';
  username: any;
  lfirstName;
  companyUsers: any;
  constructor(private title: PageTitleService,
    public service: ProductService,
    public couponservice: CouponService,
    public Regservice: TenantListService,
    private register: RegisterService,
    public suite: SuiteService,
    public auth: AuthenticationService,
    private toastr: ToastrService,
	private reg: RegisterService,
    private dataShare: DataShareService) {
    this.auth.userDetails.subscribe(val => {
      this.location = val;
    })

    this.service.productsCount.subscribe(() => this.getCounts());
    this.countsUpdate();
    /*  this.Regservice.tenantsCount.subscribe(() => this.getCounts());
     this.Regservice.clientMasterAdminCounts.subscribe(() => this.getCounts()); */
    this.initializeCount();
    this.dataShare.mainLoading.next(false);
  }

  reloadonce: string = null;
  chartData;
  chartOptions;
  labels;
  colors;
  pieChartLabels: string[];
  pieChartData: number[];
  pieChartType: any;
  piechartoptions;

  clientAdminCount = 0;
  siteAdminCounts = 0;
  mainAdminUserCount = 0;
  mainAdminProductCount = 0;
  cUsersCount = 0;

  ngOnInit() {
    this.register.uploadimage.next(true);
    this.register.clickNotification.next(true);
    this.title.adminTitle = "Dashboard";
    this.getImage();
	 this.getRoleUsers();
	this.getClientAdmins();
	console.log(this.auth);
	this.lfirstName = this.auth.loggedFirstName.value;
	//this.location = this.auth.loggedUserLocation.value;
    if (this.auth.rolebase == "ROLE_ADMIN")
      this.role = "Administrator";
    }
  getRoleUsers() {
    this.reg.getUsersByRole("ROLE_USER").subscribe(
      (response) => {
        console.log(response);
        this.roleusers = response;
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "Error");
      }
    );
  }
  getClientAdmins() {
    this.reg.getUsersByRole("ROLE_CLIENT_MASTER").subscribe((response) => {
		  //this.clientadmins = response;
		  this.companyUsers = response;
          this.companyUsers.forEach((val, i) => {
	   this.reg.getCompanyuserCount(val['email']).subscribe((response) => {
	    const obj = Object.assign(this.companyUsers[i],response);
	    obj['count'] = response;
	    this.companyUsers.push(obj);
	   });
      });
      this.clientadmins = this.companyUsers;
      this.clientadmins = this.companyUsers.filter(function (a) {
       return !this[a.email] && (this[a.email] = true);
      }, Object.create(null));
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "Error");
      }
    );
  }
  getImage() {
    this.dataShare.userdetails.subscribe(val => {
      if (val) {
        if (val.userImage) {
          this.imgprev = true;

          this.dataShare.userdetails.value.userImage;
        }
      }
    })
  }

  initializeCount() {
    this.dataShare.startCount.subscribe((val) => {
      if (val) {
        this.clientMasterAdminCount();
        this.siteAdminCount();
        this.mainAdminUsersCount();
        this.mainAdminProductsCount();
      }
    })
  }

  countsUpdate() {
    this.Regservice.clientMasterAdminCounts.subscribe((val) => {
      this.clientAdminCount = val;
    })

    this.Regservice.siteAdminCount.subscribe((val) => {
      this.siteAdminCounts = val;
    })

    this.Regservice.tenantsCount.subscribe((val) => {
      this.mainAdminUserCount = val;
      this.getCounts();
    })

    this.service.productsCount.subscribe((val) => {
      this.mainAdminProductCount = val;
      this.getCounts();
    })
  }

  clientMasterAdminCount() {
    this.Regservice.getClientMastersCount().subscribe(res => {
      console.log(res);
      this.Regservice.clientMasterAdminCounts.next(res);
    })
  }

  siteAdminCount() {
    this.Regservice.getSiteAdminsCount().subscribe(res => {
      console.log("response", res);
      this.Regservice.siteAdminCount.next(res);
    })
  }
 getSiteUsersCount(username:string) {
    this.register.getSiteUsersCount(username).subscribe(res => {
      console.log("getSiteAdminCount", res);
      this.register.siteUsersCount.next(res);
    })
  }
  mainAdminUsersCount() {
    this.Regservice.AllregisterTenantCount().subscribe(res => {
      console.log("response", res);
      this.Regservice.tenantsCount.next(res);
    })
  }
 
  mainAdminProductsCount() {
    this.service.AllproductsCount().subscribe(res => {
      this.service.productsCount.next(res);
    })
  } 
  
 getCounts() {

    this.labels = ['Insight68 - Activity'];

    this.chartOptions = {
      responsive: true,
      legend: { position: 'bottom' },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '',
            fontColor: '#000'
          },
          ticks: {
            beginAtZero: true,
            stepValue: 1,
            steps: 10,
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: '',
            fontColor: '#000',
            labelFontBold: 1
          }
        }]
      }
    }

    this.piechartoptions = {
      responsive: true,
      legend: { position: 'bottom' },
    }

    this.colors = [
      {
        backgroundColor: '#469F52'
      },
      {
        backgroundColor: '#407088'
      }
    ]

    this.chartData = [
      {
        label: 'Products',
        data: [this.mainAdminProductCount]
      },
      {
        label: 'Users',
        data: [this.mainAdminUserCount-1]
      }
    ];
    this.pieChartLabels = ['Products', 'Users'];
    this.pieChartData = [this.mainAdminProductCount, this.mainAdminUserCount-1];
    this.pieChartType = 'pie';
  }

  imgValidations(): boolean {
    if (this.imgName !== null) {
      const test = (/\.(jpg|jpeg|png)$/i).test(this.imgName);
      console.log(test);
      if (!test) {
        this.toastr.error('Please upload PNG/JPG file', "Error");
        this.imgprev = false;
      } else {
        this.imgprev = true;
        return test;
      }
    }
  }

  uploadimg() {
    var imgfileupload = ((document.getElementById("prfupd") as HTMLInputElement));
    imgfileupload.click();
    this.register.uploadimage.next(true);
  }

  uploadimage(imageInput: any) {
    const file: File = imageInput.target.files[0];
    /*   this.imgName = file.name */

    console.log(imageInput.target.files[0].name);

    const test1 = (/\.(jpg|jpeg|png)$/i).test(imageInput.target.files[0].name);
    console.log(test1);
    if (!test1) {
      this.toastr.error('Please upload PNG/JPG file', "Error");
      this.imgprev = true;

      return;
    } else if (imageInput.target.files[0].size < 250000) {
      const reader = new FileReader();
      console.log(file);
      reader.addEventListener('load', (event: any) => {
        this.userimage = event.target.result;
        console.log(this.userimage);

        this.imgprev = true;
        this.register.uploadimage.next(true);
        if (this.imgValidations) {
          this.userdetails = this.dataShare.userdetails.value;
          this.userdetails.userImage = this.userimage;
          this.register.uploaduserimage(this.userdetails).subscribe(res => {
            console.log(res);
            localStorage.setItem('userDetails', JSON.stringify(res));
            this.dataShare.userdetails.next(res);
            this.register.uploadimage.next(true);
            this.register.userimage = res;
            this.toastr.success('Image uploaded', 'Success');

          }, err => {
            console.log(err);
          })
        }

      });
      reader.readAsDataURL(file);

    } else {
      // this.imgprev = false;
      this.toastr.warning("Image size should be less than 250kb", "Warning");

    }
  }

}
