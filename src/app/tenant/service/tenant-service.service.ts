import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { ErrorHandlerService } from 'src/app/share/service/error-handler.service';
import { Product, changePwd } from 'src/app/share/model/model';
import { catchError, retry } from 'rxjs/operators';
import { IpService } from 'src/app/share/service/ip.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { DataShareService } from 'src/app/share/service/data-share.service';

@Injectable({
  providedIn: 'root'
})

export class TenantServiceService {

  dataEmail;
  trialProdInDash = new BehaviorSubject(false);

  constructor(private http: HttpClient,
    private errHandler: ErrorHandlerService,
    private ip: IpService,
    private data: DataShareService,
    private auth: AuthenticationService) {
    this.data.email.subscribe(val => this.dataEmail = val);
  }

  // To Get the New Products - Not yet subscribed
  productsList(): Observable<Product[]> {
    const username = this.auth.decoded.sub;
    return this.http.get<Product[]>(`${this.ip.ip}:2151/product/paasproduct/findAllUnSubscribedProducts/${username}`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // To get the subscribed products
  tenantProducts(): Observable<Product[]> {
    const username = this.auth.decoded.sub;
    return this.http.get<Product[]>(`${this.ip.ip}:2175/paaslicense/license/${username}`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // To get the subscribed products by admin login
  tenantProductsbyAdmin(email): Observable<Product[]> {
    console.log(email);
    return this.http.get<Product[]>(`${this.ip.ip}:2175/paaslicense/license/${email}`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  listOfTrialProducts(): Observable<Product[]> {
    const username = this.auth.decoded.sub;
    return this.http.get<Product[]>(`${this.ip.ip}:2175/paaslicense/license/unSubscribedProducts/${username}`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Add product to trial
  addToTrial(prod: Product[]): Observable<Product[]> {
    const username = this.auth.decoded.sub;
    return this.http.post<Product[]>(`${this.ip.ip}:2175/paaslicense/license/trial/${username}`, prod)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Activate license to Buy the product
  activateLicense(prodid, pStatus): Observable<any> {
    const userDetails = this.data.userdetails.value;
	const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post<any>(`${this.ip.ip}:2175/paaslicense/license/activateLicense/${prodid}/${pStatus}/${userDetails.username}/${userDetails.role}/${userDetails.clientmaster}/${userDetails.siteadmin}`, null, { headers, responseType: 'text' as 'json' })
      .pipe(catchError(this.errHandler.handleError));
  }
  activateLicenseCompany(prodid,pStatus,username,role,rolename,siteadmin): Observable<any> {
    //const userDetails = this.data.userdetails.value;
	const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post<any>(`${this.ip.ip}:2175/paaslicense/license/activateLicense/${prodid}/${pStatus}/${username}/${role}/${rolename}/${siteadmin}`, null, { headers, responseType: 'text' as 'json' })
      .pipe(catchError(this.errHandler.handleError));
  }
  // Apply the coupon code to product at add to cart functnality in New-Products Component
  applycoupon(product, couponcode): Observable<Product[]> {
    return this.http.put<Product[]>(`${this.ip.ip}:2151/product/paasproduct/applyCoupon/${couponcode}`, product)
      .pipe(catchError(this.errHandler.handleError));
  }

  getDate() {
    const responseType: Object = {
      responseType: 'text'
    }
    return this.http.get<string>(`${this.ip.ip}:2151/product/paasproduct/getDate`, responseType)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  changePassword(changePassword: changePwd) {
    /* const responseType: Object = {
      responseType: 'text'
    } */
    const username = this.auth.decoded.sub;
    return this.http.put<any>(`${this.ip.ip}:2137/admintask/users/changePassword/${username}`, changePassword)
      .pipe(catchError(this.errHandler.handleError));
  }

  // assign products to single user
  assignProducts(username, prodid, plid) {
	  const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post<Product[]>(`${this.ip.ip}:2175/paaslicense/license/assignProduct/${username}/${prodid}/${plid}`, null, { headers, responseType: 'text' as 'json' })
      .pipe(catchError(this.errHandler.handleError));
  }

  getAssignedProducts() {
    const username = this.auth.decoded.sub;
    return this.http.get<Product[]>(`${this.ip.ip}:2175/paaslicense/license/assignedProducts/${username}`)
      .pipe(catchError(this.errHandler.handleError));
  }
  getProducts(productid) {
    const username = this.auth.decoded.sub;
    return this.http.get<any>(`${this.ip.ip}:2151/product/paasproduct/findById/${productid}`)
      .pipe(catchError(this.errHandler.handleError));
  }

}
