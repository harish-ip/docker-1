import { Component, OnInit } from '@angular/core';
import { Product, Register } from 'src/app/share/model/model';
import { TenantServiceService } from '../service/tenant-service.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/share/service/register.service';
import { DataShareService } from 'src/app/share/service/data-share.service';

@Component({
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html',
  styleUrls: ['./tenant-dashboard.component.css']
})

export class TenantDashboardComponent implements OnInit {

  newProducts: Product[];
  productscount = 0;
  tenantSubscribedProducts: Product[];
  subscribedCount = 0;
  trialProducts: Product[];
  trialproductscount = 0;
  role;
  location;
  userimage;
  imgprev = false;
  userdetails: Register;
  lfirstName;
  constructor(private tenantService: TenantServiceService,
    public auth: AuthenticationService,
    private register: RegisterService,
    public dataShare: DataShareService,
    private toastr: ToastrService) {
    this.auth.userDetails.subscribe(val => {
      this.location = val;
    })
    this.dataShare.mainLoading.next(false);
  }

  ngOnInit() {
    this.register.clickClientNotication.next(true);
    if (this.auth.rolebase == "ROLE_USER")
      this.role = "User";
    else if (this.auth.rolebase == "ROLE_SITE_USER")
      this.role = "Site User";

    this.getNewProducts();
    this.getSubscribedProducts();
    this.getTrailProducts();
    this.getImage();
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

  getNewProducts() {
    this.tenantService.productsList().subscribe(response => {
      this.newProducts = response;
      if (this.newProducts.length > 0)
        this.productscount = this.newProducts.length;
      else
        this.productscount = 0;

    }, err => {
      console.log(err);
    });
  }

  getSubscribedProducts() {
    this.tenantService.tenantProducts().subscribe((res) => {
      this.tenantSubscribedProducts = res['uniqueProducts'];
      if (this.tenantSubscribedProducts.length > 0)
        this.subscribedCount = this.tenantSubscribedProducts.length;
      else
        this.subscribedCount = 0;
    }, err => {
      console.log(err);
    });
  }

  getTrailProducts() {
    this.tenantService.listOfTrialProducts().subscribe((res) => {
      this.trialProducts = res['uniqueProducts'];
      if (this.trialProducts.length > 0)
        this.trialproductscount = this.trialProducts.length;
      else
        this.trialproductscount = 0;

    }, err => {
      console.log(err);
    })
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
      // this.imgprev = false;
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
        // this.imgprev = false;
      this.toastr.warning("Image size should be less than 250kb", "Warning");
    }
  }
}