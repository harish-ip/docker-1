import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { TenantServiceService } from 'src/app/tenant/service/tenant-service.service';
import { Product, Checkbox } from 'src/app/share/model/model';
import { ProductService } from '../../Admin-Share/product.service';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { PageTitleService } from 'src/app/share/service/page-title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RegisterService } from 'src/app/share/service/register.service';
import { Register } from 'src/app/share/model/model';
import { CartService } from 'src/app/share/service/cart.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  searchTerm: string;
  products: Product[] = [];
  p = 1;
  productIcon = [];
  pid;
  prdname;
  prddesc;
  OrderSummaryProducts = [];
  totalprice = 0;
  subend: any;
clientadmins: Register[] = [];
assignProduct: Product = null;
 selectedSiteAdmin: string = '';
  selectedSiteUser: string = '';
  selectedCompany: string = '';
  selectedProd: Product;
  buyProduct: Product;
  selproductId;
  selProductLicenseID;
  productName = "";
  productdesc = "";
  companyUser: string = '';
  public checkbox: Checkbox[] = [];
  cartitems = [];
  loading = false;
  constructor(private service: ProductService,
  private tenantService: TenantServiceService,
  private auth: AuthenticationService,
    private router: Router,
    private data: DataShareService,
    private toastr: ToastrService,
    public title: PageTitleService,
	private register: RegisterService,
	private reg: RegisterService,
	 private cart: CartService,
	 private tenant: TenantServiceService,
	 
    public santizer: DomSanitizer) { }
  ngOnInit() {
    this.title.adminTitle = "Product List";
    this.getProductsList();
	this.getClientAdmins();
	this.getCartItems();
  }
  
  getProductsList() {
    this.title.isLoding = false;
    this.service.productsList().subscribe(
      (response) => {
        console.log(response);
        this.products = response;
        this.getproducticons();
        if (this.service.productsList !== null) {
          this.service.productsCount.next(this.products.length);
        } else {
          this.service.productsCount.next(0);
        }
        this.title.isLoding = true;
      },
      (err) => {
        console.log(err);
        if (err.status == 500) {
          this.toastr.error(err.error.message, 'Error');
        }
        this.title.isLoding = true;
      }
    )
  }


  getproducticons() {
    for (var i = 0; i < this.products.length; i++) {
      this.productIcon[i] = this.santizer.bypassSecurityTrustResourceUrl(this.products[i].productIcon)
    }
  }

  select() {
    this.router.navigate(['/admin/products/product-list']);
  }
  /*  if (this.cart.products !== null) {
        this.cart.cartIndicationNum = this.cartitems.length;
        this.initialCheckBox(this.cartitems.length);
      } else {
        this.cart.cartIndicationNum = 0;
      } */

  UpdateProduct(product: Product) {
    // product.productPrice = "TBD";
    this.data.product = product;
    this.router.navigate(['/admin/products/edit-product']);
  }

  getDeletePrdDetails(product: Product) {
    this.pid = product.productId;
    this.prdname = product.productName;
    this.prddesc = product.productDescription;
  }

  DeleteProduct() {

    console.log("Implement delete functionality here");
    console.log(this.pid);
    this.service.deleteProduct(this.pid).subscribe(
      () => {
        this.toastr.success(`Product:${this.prdname} deleted successfully`, "Success");
        const val = this.service.productsCount.value - 1;
        this.service.productsCount.next(val);
        this.getProductsList();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  key: string = 'productName';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
   getClientAdmins() {
    this.reg.getUsersByRole("ROLE_CLIENT_MASTER").subscribe(
      (response) => {
        console.log(response);
        this.clientadmins = response;
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message, "Error");
      }
    );
  }
    assignCompanyProducts(username,prod) {
		console.log('This Assign company products');
		this.assignProduct = prod;
		console.log(this.assignProduct);
    this.assignProduct.assignedBy = this.auth.decoded.sub;
    console.log(this.assignProduct);
    this.tenantService.assignProducts(this.selectedSiteAdmin,this.selproductId,this.selProductLicenseID).subscribe(res => {
      console.log(res);
      this.toastr.success(this.assignProduct.productName + " is assigned to " + this.selectedSiteAdmin + " successfully", 'Success');
    
    }, err => {
      console.log(err);
      if (err.status == 409) {
        this.toastr.warning(this.assignProduct.productName + " already exits for " + this.selectedSiteAdmin, "Warning");
    
      }
    },
      () => this.clear())
  }
   clear() {
    this.selectedSiteAdmin = '';
    this.selectedSiteUser = '';
    this.assignProduct = null;
	this.selectedCompany = '';
  }
  onCompSelected(){
	  this.companyUser = this.selectedCompany;
  }
    copyBuyProduct(prod: Product) {
    this.buyProduct = prod;
    this.productName = prod.productName;
    this.productdesc = prod.productDescription;
    this.selproductId = prod.productId;
  }
  copyAssignProduct(prod: Product) {
    this.assignProduct = prod;
    this.selproductId = prod.productId;
    this.selProductLicenseID = prod.id;

  }
  buyproductconverttonumber() {
    if (this.buyProduct.productDuration == 'year')
      this.buyProduct.productDuration = '365'
    else if (this.buyProduct.productDuration == 'month')
      this.buyProduct.productDuration = '30'
    else
      this.buyProduct.productDuration = '1095'
  }
  buyproductconverttotext() {
    if (this.buyProduct.productDuration == '365')
      this.buyProduct.productDuration = 'year'
    else if (this.buyProduct.productDuration == '30')
      this.buyProduct.productDuration = 'month'
    else
      this.buyProduct.productDuration = '3 years'
  }
   assignLicense() {
    this.buyproductconverttonumber();
    this.tenant.activateLicenseCompany(this.selproductId,'forBuy',this.companyUser,'ROLE_CLIENT_MASTER','null','null').subscribe((res) => {
      //console.log(res);
      this.toastr.success('Assigned '+ this.productName+' license to the company', 'Success');
      // this.getNewProducts();
      this.router.navigate(["/admin/products/subscribed-products"]);
    }, err => {
      console.log(err);
      this.buyproductconverttotext();
      this.toastr.error(err.error.message, 'Error');
    })
  }
  getCartItems() {
    if (this.auth.isUserLoggedIn()) {

      this.cart.getFromCartCompany(this.selectedCompany,this.buyProduct).subscribe(res => {

        this.cartitems = res['uniqueProductDTO'];
        this.cart.products = this.cartitems;

        // Cart indication number
        if (this.cart.products !== null) {
          this.cart.cartIndicationNum = this.cartitems.length;
          this.initialCheckBox(this.cartitems.length);
        } else {
          this.cart.cartIndicationNum = 0;
        }

        // Order Summary details
        if (this.cartitems !== null) {
          for (let i = 0; i < this.cartitems.length; i++) {

            this.OrderSummaryProducts.push(this.cartitems[i]);
            this.totalprice = this.totalprice + this.cartitems[i].productPrice;

            if (this.cartitems[i].productDuration == '30') {
              this.cartitems[i].startDate = new Date();
              this.subend = new Date();
              this.subend.setDate(this.subend.getDate() + 30);
            }
            else if (this.cartitems[i].productDuration == '365') {
              this.cartitems[i].startDate = new Date();
              this.subend = new Date();
              this.subend.setDate(this.subend.getDate() + 365);
            }
            else if (this.cartitems[i].productDuration == '1095') {
              this.cartitems[i].startDate = new Date();
              this.subend = new Date();
              this.subend.setDate(this.subend.getDate() + 1095);
            }

          }
        }
      }, err => {
        console.log(err);
      });
    }
  }
   initialCheckBox(num) {
    // console.log(num);
    this.checkbox.length = 0;
    for (let i = 0; i < num; i++) {
      let ch = {
        checked: true,
        value: null
      };
      this.checkbox.push(ch);
    }
  }
}
