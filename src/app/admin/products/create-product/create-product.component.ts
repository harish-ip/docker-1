import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Product, Suite } from 'src/app/share/model/model';
import { ProductService } from '../../Admin-Share/product.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {


  id;
  ImageFileName: string = '';
  iconName: string = '';
  myGroup: FormGroup;
  errBoolean = false;
  validations = false;
  showsuite = false;
  resProduct: Product;
  productlist: Product[];
  suites: Suite[];
  previewImage: boolean = false;
  perviewIcon: boolean = false;
  loading = false;
  btnDisable: boolean = false;
  productIcon;

  product: Product = {
    productName: '',
    productPrice: null,
    productURL: null,
    productDescription: null,
    productDuration: 'subscribe',
    productImage: null,
    trialDuration: 'trial',
    productIcon: ''
  };

  constructor(private service: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private title: PageTitleService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.title.adminTitle = "Create Product";
  }


  validateProductDuration(duration): boolean {
    console.log(duration);
    if (duration != "null") {
      return true;
    }
    else {
      this.toastr.warning('Please select product duration', 'Warning');
      return false;
    }
  }

  productValidations(): boolean {
    if (this.ImageFileName !== null) {
      // const regexp = new RegExp('([^\\s]+(\\.(?i)(jpg|png|gif))$)');
      const test1 = (/\.(jpg|jpeg|png)$/i).test(this.ImageFileName);
      console.log(test1);
      if (!test1) {
        this.toastr.error('Please upload PNG/JPG file', "Error");
        this.previewImage = false;
      } else {
        this.previewImage = true;
        return test1;
      }
    }
    else {
      this.previewImage = false;
      return false;
    }
  }

  loadingDisable() {
    this.loading = false;
    this.btnDisable = false;
  }

  prodValidation() {
    if (this.product.productName.trim().length == 0) {
      console.log(this.product.productName);
      this.toastr.warning("Product name should not be empty.", "Warning");
      this.loadingDisable();
      return false;
    } else {
      this.product.productName.trim();
      console.log("this.product.productDescription.trim()", this.product.productDescription.trim().length);
      /* if (this.product.productDescription.trim().length < 17) {
        this.toastr.warning("Product description does not allow all white spaces", "Warning");
        this.loadingDisable();
        return false;
      } */
      return true;
    }
  }

  processFile(imageInput: any) {
    const file: File = imageInput.target.files[0];
    this.ImageFileName = file.name;
    if (imageInput.target.files[0].size >= 20000 && imageInput.target.files[0].size < 250000) {
      const reader = new FileReader();
      console.log(file);
      reader.addEventListener('load', (event: any) => {
        this.product.productImage = event.target.result;
      });
      reader.readAsDataURL(file);
      this.productValidations();
    } else {
      this.previewImage = false;
      this.toastr.warning("Image size should be greater than 20kb and  less than 250kb", "Warning");
    }
  }

  iconFile(imageInput: any) {
    const file: File = imageInput.target.files[0];
    this.iconName = file.name;
    if (imageInput.target.files[0].size < 10000) {
      const reader = new FileReader();
      console.log(file);
      reader.addEventListener('load', (event: any) => {
        console.log(event.target.result);
        this.productIcon = this.domSanitizer.bypassSecurityTrustResourceUrl(event.target.result);
        this.product.productIcon = event.target.result;
        console.log("this.product.productIcon", this.product.productIcon);
      });
      reader.readAsDataURL(file);
      this.iconValidation();
    } else {
      this.perviewIcon = false;
      this.toastr.warning("Icon size should be less than 10kb", "Warning");
    }
  }

  iconValidation(): boolean {
    if (this.iconName != null) {
      // const regexp = new RegExp('([^\\s]+(\\.(?i)(jpg|png|gif))$)');
      const test1 = (/\.(svg|SVG)$/i).test(this.iconName);
      console.log(test1);
      if (!test1) {
        this.toastr.error('Please upload SVG file', "Error");
        this.perviewIcon = false;
        return false;
      } else {
        this.perviewIcon = true;
        return test1;
      }
    }
    else {
      this.perviewIcon = false;
      return false;
    }
  }

  createProducts() {
    this.loading = true;
    this.btnDisable = true;
    console.log(this.product);
    if (this.productValidations() && this.validateProductDuration(this.product.productDuration) && this.prodValidation() && this.iconValidation()) {
      this.product.productName = this.product.productName.trim();
      this.product.productName = this.product.productName.charAt(0).toUpperCase() + this.product.productName.slice(1);
      this.service.createProduct(this.product).subscribe((res) => {
        this.resProduct = res;
        console.log(this.resProduct);
        this.toastr.success('Product created successfully', 'Success');
        this.router.navigate(['/admin/products/product-list']);
      }, err => {
        if (err.status === 200) {
          console.log("err prod ");
          console.log('err  posted data');
          this.loadingDisable();
        }
        if (err.status === 500) {
          this.toastr.warning(err.error.message, 'Warning');
          this.loadingDisable();
        }
      });
    }
  }

}
