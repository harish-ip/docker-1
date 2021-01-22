import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { ErrorHandlerService } from 'src/app/share/service/error-handler.service';
import { IpService } from 'src/app/share/service/ip.service';
import { Product } from 'src/app/share/model/model';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class RefundService {

  constructor(private http: HttpClient,
    private errHandler: ErrorHandlerService,
    private ip: IpService,
    private auth: AuthenticationService) { }

  username = new BehaviorSubject(localStorage.getItem('refundUsername'));
  email = new BehaviorSubject(localStorage.getItem('refundUserEmail'));
  refundProduct: Product = null;

  // Get user subscribed products
  getAllTenantProducts(email) {
    return this.http.get<Product[]>(`${this.ip.ip}:2175/paaslicense/license/findAllProducts/${email}`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Exchange Product
  exchangeProduct(Product: Product, email, productId): Observable<any> {
    return this.http.post<any>(`${this.ip.ip}:2175/paaslicense/license/exchangeProduct/${productId}/${email}`, Product)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Offline payment
  addProduct(email, paymentMode, transactionNumber, product: Product[]): Observable<Product[]> {
    const role = this.auth.decoded.auth.authority;
    return this.http.post<Product[]>(`${this.ip.ip}:2175/paaslicense/license/addProduct/${email}/${role}/${paymentMode}/${transactionNumber}`, product)
      .pipe(catchError(this.errHandler.handleError));
  }
}
