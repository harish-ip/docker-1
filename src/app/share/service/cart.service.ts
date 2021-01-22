import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { IpService } from './ip.service';
import { Product } from '../model/model';
import { DataShareService } from './data-share.service';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartIndicationNum = 0;
  products = [];
  cartItemsSent = sessionStorage.getItem('cartItemsSent') || false;
  onInitialCart = new BehaviorSubject(sessionStorage.getItem('onInitialCart'));
  totalSelectedProducts = 0;

  constructor(private http: HttpClient,
    private err: ErrorHandlerService,
    private ip: IpService,
    private datShare: DataShareService,) {
    this.products = JSON.parse(localStorage.getItem('trial'));

    if (this.products)
      this.cartIndicationNum = this.products.length;
    else {
      this.products = [];
      this.cartIndicationNum = 0;
    }
  }

  // Add product to cart
  addToCart(luser, selproductId): Observable<any> {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    console.log(`${this.ip.ip}:2170/rest/v1/cart/${user.username}/${selproductId}`);
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post<any>(`${this.ip.ip}:2170/rest/v1/cart/${luser}/${selproductId}`, null, { headers, responseType: 'text' as 'json' })
      .pipe(catchError(this.err.handleError));
  }
  // Get products from cart
  getFromCart(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    return this.http.get<any>(`${this.ip.ip}:2170/paascart/cart/${user.username}`)
      .pipe(catchError(this.err.handleError));
  }
  // Get products from cart
  getFromCartCompany(username, prod): Observable<any> {
    //const user = JSON.parse(localStorage.getItem('userDetails'));
    return this.http.get<any>(`${this.ip.ip}:2170/paascart/cart/${username}`)
      .pipe(catchError(this.err.handleError));
  }
  addToCartCompany(product: Product[], username): Observable<any> {
    console.log('add cart');
    console.log(product);
    return this.http.post<any>(`${this.ip.ip}:2170/paascart/cart/${username}`, product)
      .pipe(catchError(this.err.handleError));
  }
  // delete product from cart
  deleteProductFromCart(productId): Observable<any> {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    console.log(user);
    if (user != null) {
      return this.http.delete<any>(`${this.ip.ip}:2170/paascart/cart/product/${user.username}/${productId}`)
        .pipe(catchError(this.err.handleError));
    }
  }

  // Apply the coupon code to tenant in cart page
  applyCouponToUser(totalprice, couponcode): Observable<any> {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    return this.http.get<any>(`${this.ip.ip}:2170/paascart/cart/applyCoupon/${user.username}/${totalprice}/${couponcode}`)
      .pipe(catchError(this.err.handleError));
  }

}