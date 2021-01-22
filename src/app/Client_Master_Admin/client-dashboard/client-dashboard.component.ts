import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { RegisterService } from 'src/app/share/service/register.service';
import { ProductService } from 'src/app/admin/Admin-Share/product.service';
import { TenantListService } from 'src/app/admin/Admin-Share/tenant-list.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})

export class ClientDashboardComponent implements OnInit {

  location;
  role;
  userimage: any;
  imgprev: boolean;
  userdetails: any;
  lfirstName;
  constructor(
    public service: ProductService,
    public Regservice: TenantListService,
    private register: RegisterService,
    public auth: AuthenticationService,
    private toastr: ToastrService,
    private dataShare: DataShareService,
    public title: PageTitleService) {
    this.auth.userDetails.subscribe(val => {
      this.location = val;
    })
    this.service.productsCount.subscribe(() => this.getCounts());
    this.countsUpdate();
    this.title.isLoding = true;
    this.initializeCount();
  }

  reloadonce: string = null;
  chartData;
  chartOptions;
  labels;
  colors;
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: any;
  piechartoptions;

  clientSiteAdminsCount = 0;
  clientSiteUserCount = 0;
  clientEmailsCount = 0;
  clientProductsCount = 0;
  companyUsersCount = 0;

  ngOnInit() {
    this.register.clickClientNotication.next(true);
    this.getImage();
    this.role = "Client Master";
    this.title.isLoding = false;
	this.lfirstName = this.auth.loggedFirstName.value;
  }

  countsUpdate() {
    this.register.siteAdminsCount.subscribe((val) => {
      this.clientSiteAdminsCount = val;
    });
    this.register.siteUsersCount.subscribe((val) => {
      this.clientSiteUserCount = val;
    })
    this.register.clientEmailsCount.subscribe((val) => {
      this.clientEmailsCount = val;
      this.getCounts();
    })
    this.register.clientProductsCount.subscribe(val => {
      this.clientProductsCount = val;
      this.getCounts();
    })
	this.register.companyUsersCount.subscribe((val) => {
      this.companyUsersCount = val;
	  this.getCounts();
    });
	
	
  }

  initializeCount() {
    this.dataShare.startCount.subscribe((val) => {
      if (val) {
        this.getProductCount();
        this.getSiteAdminCount();
        this.getSiteUsersCount();
        this.getEmailsCount();
		this.getCompanyUsersCount();
      }
    })
  }

  getProductCount() {
    this.register.getClentMasterProductsCount(this.auth.decoded.sub).subscribe(res => {
      console.log("getSiteAdminCount", res);
      this.register.clientProductsCount.next(res);
    })
  }

  getSiteAdminCount() {
    this.register.getSiteAdminsCount(this.auth.decoded.sub).subscribe(res => {
      console.log("getSiteAdminCount", res);
      this.register.siteAdminsCount.next(res);
    })
  }

  getSiteUsersCount() {
    this.register.getSiteUsersCount(this.auth.decoded.sub).subscribe(res => {
      console.log("getSiteAdminCount", res);
      this.register.siteUsersCount.next(res);
    })
  }
   getCompanyUsersCount() {
    this.register.getCompanyuserCount(this.auth.decoded.sub).subscribe(res => {
      console.log("getSiteAdminCount", res);
      this.register.companyUsersCount.next(res);
    })
  }

  getEmailsCount() {
    this.register.getClientEmailsCount(this.auth.decoded.sub).subscribe(res => {
      console.log("getSiteAdminCount", res);
      this.register.clientEmailsCount.next(res);
    })
  }

  getImage() {
    this.dataShare.userdetails.subscribe(val => {
      if (val) {
        if (val.userImage) {
          this.imgprev = true;
          this.dataShare.userdetails.value.userImage
        }
      }
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
        data: [this.clientProductsCount]
      },
      {
        label: 'Users',
        data: [this.companyUsersCount]
      }
    ];

    this.pieChartLabels = ['Products', 'Users'];
    this.pieChartData = [this.clientProductsCount, this.companyUsersCount];
    this.pieChartType = 'pie';

  }

  uploadimg() {
    var imgfileupload = ((document.getElementById("prfupd") as HTMLInputElement));
    imgfileupload.click();
  }

  uploadimage(imageInput: any) {
    const file: File = imageInput.target.files[0];

    console.log(imageInput.target.files[0].name);

    const test1 = (/\.(jpg|jpeg|png)$/i).test(imageInput.target.files[0].name);
    console.log(test1);
    if (!test1) {
      this.toastr.error('Please upload PNG/JPG file', "Error");
      this.imgprev = true;
      return;
    }
    else if (imageInput.target.files[0].size < 250000) {
      const reader = new FileReader();
      console.log(file);
      reader.addEventListener('load', (event: any) => {
        this.userimage = event.target.result;
        console.log(this.userimage);
        this.imgprev = true;
        if (this.imgprev) {
          this.userdetails = this.dataShare.userdetails.value;
          this.userdetails.userImage = this.userimage;
          this.register.uploaduserimage(this.userdetails).subscribe(res => {
            console.log(res);
            localStorage.setItem('userDetails', JSON.stringify(res));
            this.dataShare.userdetails.next(res);
            this.toastr.success('Image uploaded', 'Success');
          }, err => {
            console.log(err);
          })
        }

      });
      reader.readAsDataURL(file);
    } else {
      /*  this.imgprev = false; */
      this.toastr.warning("Image size should be less than 250kb", "Warning");
    }
  }

}

