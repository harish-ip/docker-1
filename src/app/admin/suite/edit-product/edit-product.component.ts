import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ProductService } from '../../Admin-Share/product.service';
import { Product, Suite } from 'src/app/share/model/model';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  suites: Suite[];
  ImageFileName: string;
  id: number;
  intSuiteId: number;
  showTemp = false;

  product: Product = {
    productId: null,
    productName: null,
    productPrice: null,
    productURL: null,
    productDescription: null,
    productDuration: null,
    productImage: null,
    productIcon: '',
  };
  iconName: string;
  perviewIcon: boolean;

  constructor(private service: ProductService,
    private router: Router,
    private data: DataShareService,
    private toastr: ToastrService,
    private title: PageTitleService,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.title.adminTitle = "Edit Product";
    const product = this.data.product;
    if (product) {
      this.product = product;
      this.showTemp = !this.showTemp;
    }

  }

  editProducts() {
    console.log(this.product);
    if (true) {
      this.service.updateProduct(this.product).subscribe(
        (res) => {
          console.log(res);
          this.toastr.success(`Product updated successfully with product id ${this.product.productId}`, "Success");
          this.router.navigate(['/admin/suites/product-list']);
        },
        (err) => {
          if (err.status === 500) {
            this.toastr.warning(err.error.message, "Warning");
          }
          console.log(err);
        }
      );
    }
  }

  processFile(imageInput: any) {
    const file: File = imageInput.target.files[0];
    this.ImageFileName = file.name;
    const reader = new FileReader();
    console.log(file);
    reader.addEventListener('load', (event: any) => {
      this.product.productImage = event.target.result;
      console.log(this.product.productImage);

    });
    reader.readAsDataURL(file);
  }


  iconFile(imageInput: any) {
    const file: File = imageInput.target.files[0];
    this.iconName = file.name;
    if (imageInput.target.files[0].size < 10000) {
      const reader = new FileReader();
      console.log(file);
      reader.addEventListener('load', (event: any) => {
        console.log(event.target.result);
        this.product.productIcon = event.target.result;
        console.log("this.product.productIcon", this.product.productIcon);
      });
      reader.readAsDataURL(file);
      // this.iconValidation();
    } else {
      this.toastr.warning("Icon size should be less than 10kb", "Warning");
    }
  }

  iconValidation(): boolean {
    if (true) {
      // const regexp = new RegExp('([^\\s]+(\\.(?i)(jpg|png|gif))$)');
      const test1 = (/\.(svg|SVG)$/i).test(this.iconName);
      console.log(test1);
      if (!test1) {
        this.toastr.error('Please upload SVG file', "Error");
        this.perviewIcon = false;
      } else {
        this.perviewIcon = true;
        return test1;
      }
    }
    else {
      return false;
    }
  }

}
