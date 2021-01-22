import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { ErrorHandlerService } from 'src/app/share/service/error-handler.service';
import { IpService } from 'src/app/share/service/ip.service';
import { Coupon, Product } from 'src/app/share/model/model';
import { DataShareService } from 'src/app/share/service/data-share.service';

@Injectable({
  providedIn: 'root'
})

export class CouponService {

  dataEmail;
  couponsCount = new BehaviorSubject(0);

  constructor(private http: HttpClient,
    private errHandler: ErrorHandlerService,
    private ip: IpService,
    private data: DataShareService, ) {
    this.dataEmail = this.data.email;
  }

  baseUrl = `${this.ip.ip}:2246/coupon/`;

  // Get the Coupons List
  couponList(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.baseUrl + 'getCoupons')
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Get the Coupons Count
  AllcouponCount(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getCouponCount')
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Create the Coupon
  createCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(this.baseUrl + 'saveCoupon', coupon)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Delete the Coupon
  deletecoupon(couponcode): Observable<void> {
    const responseType: Object = {
      responseType: 'text'
    }
    return this.http.delete<void>(this.baseUrl + `deleteCoupon/${couponcode}`, responseType)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Update the Coupon
  updateCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.put<Coupon>(this.baseUrl + `updateCoupon`, coupon)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Apply Coupon to the product
  CouponToProduct(coupon: Coupon, selectedvalues): Observable<Coupon> {
    return this.http.post<Coupon>(this.baseUrl + `saveCouponforProducts/${coupon}`, selectedvalues)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Apply Coupon to the user
  CouponToUser(coupon: Coupon, selectedUsers): Observable<Coupon> {
    return this.http.post<Coupon>(this.baseUrl + `saveUserCoupon/${coupon}`, selectedUsers)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Get the Coupon to product List
  CouponToProductList(): Observable<Coupon> {
    return this.http.get<Coupon>(this.baseUrl + `getAllCoupons`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Get the Coupons to Users List
  CouponToUsersList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `getUserCouponList`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

}
