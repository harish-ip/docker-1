import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { RefundService } from '../../Admin-Share/refund.service';
import { Product } from 'src/app/share/model/model';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { ProductService } from '../../Admin-Share/product.service';

@Component({
  selector: 'app-refund-amount',
  templateUrl: './refund-amount.component.html',
  styleUrls: ['./refund-amount.component.css']
})

export class RefundAmountComponent implements OnInit {
  amount;
  refundProduct: Product;
  tenantName: string;

  constructor(private refund: RefundService,
    private product: ProductService,
    private title: PageTitleService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.title.adminTitle = "Refund";
    this.tenantName = this.refund.username.value;
    if (this.tenantName) {
      this.tenantName = this.tenantName.charAt(0).toUpperCase() + this.tenantName.slice(1);
      this.title.isLoding = true;
    }
    if (this.refund.refundProduct) {
      this.refundProduct = this.refund.refundProduct;
      this.amount = this.refundProduct.productPrice;
      console.log(this.amount);
    }
    this.getProducts();
  }

  getProducts() {
    this.product.productsList().subscribe(
      (response) => {
        console.log(this.refundProduct);
        console.log(response)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  pay() {
    if (confirm(`Are you sure to pay $ ${this.amount} `)) {
      console.log(this.amount);
      this.toastr.success("Amount $" + this.amount + " refunded successfully", "Success");
      this.router.navigate(['/admin/refund/Refund-and-adjustment']);
    }
  }

}
