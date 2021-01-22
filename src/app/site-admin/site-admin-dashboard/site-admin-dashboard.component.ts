import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/admin/Admin-Share/product.service';
import { TenantListService } from 'src/app/admin/Admin-Share/tenant-list.service';
import { RegisterService } from 'src/app/share/service/register.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';

@Component({
  selector: 'app-site-admin-dashboard',
  templateUrl: './site-admin-dashboard.component.html',
  styleUrls: ['./site-admin-dashboard.component.css']
})
export class SiteADminDashboardComponent implements OnInit {

  location;
  role;
  userimage: any;
  imgprev: boolean;
  userdetails: any;
  userCounts = 0;
  productsCounts = 0;
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
    this.title.isLoding = true;
    this.getSiteAdminuserCount();
    this.getsiteProductsCount();
    this.updateCounts();
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

  ngOnInit() {
    this.register.clickClientNotication.next(true);
    this.getImage();
    this.role = "Site Admin";
    this.title.isLoding = false;
    this.lfirstName = this.auth.loggedFirstName.value;
  }

  updateCounts() {
    this.register.siteAdminUserCount.subscribe((val) => {
      this.userCounts = val;
      this.getCounts();
    })
    this.register.siteProductsCount.subscribe(val => {
      this.productsCounts = val;
      this.getCounts();
    })
  }

  getSiteAdminuserCount() {
    this.register.getSiteAdminUsersCount(this.auth.decoded.sub).subscribe(response => {
      this.register.siteAdminUserCount.next(response);
    })
  }

  getsiteProductsCount() {
    this.register.getClentMasterProductsCount(this.auth.decoded.sub).subscribe(response => {
      this.register.siteProductsCount.next(response);
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
        data: [this.productsCounts]
      },
      {
        label: 'Users',
        data: [this.userCounts]
      }
    ];

    this.pieChartLabels = ['Products', 'Users'];
    this.pieChartData = [this.productsCounts, this.userCounts];
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
      /*    this.imgprev = false; */
      this.toastr.warning("Image size should be less than 250kb", "Warning");
    }
  }

}