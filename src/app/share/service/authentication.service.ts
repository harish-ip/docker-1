import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CartService } from './cart.service';
import { JWT, Register } from '../model/model';
import { IpService } from './ip.service';
import { ErrorHandlerService } from './error-handler.service';
import { DataShareService } from './data-share.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  authenticatedUser: any;
  rolebase: string = null;
  islogin: boolean = false;
  baseUrl = this.ip.ip + ":2137/admintask/users/signin";
  userName = null;
  //loggedFirstName = localStorage.getItem('logfirstName');
  loggedlastName = localStorage.getItem('loglastName');
  token: string = localStorage.getItem('token') || null;
  decoded: JWT;
  refresh_Token = null;
  organizationName = new BehaviorSubject('');
  loggedFirstName = new BehaviorSubject('');
  loggedUserLocation = new BehaviorSubject('');
  userDetails = new BehaviorSubject(localStorage.getItem('location'));
  emailDetails;


  constructor(private http: HttpClient,
    private errHandler: ErrorHandlerService,
    private ip: IpService,
    private cart: CartService,
    private datashare: DataShareService,
    private router: Router,
    private toastr: ToastrService) {
    this.decodeToken();
    this.detectBrowserRefresh();
  }

  detectBrowserRefresh() {
    const reload = sessionStorage.getItem('firstReload');
    if (this.islogin) {
      this.datashare.startCount.next(true);
	  //this.loggedFirstName = localStorage.getItem('logfirstName');
      this.loggedlastName = localStorage.getItem('loglastName');
    }
    if (reload == null && this.token) {
      if (this.isTokenExpired()) {
        this.refreshToken().subscribe();
      }
      sessionStorage.setItem('firstReload', "true");
      if (this.router.url == "/") {
        if (this.decoded.auth.authority == "ROLE_USER" || this.decoded.auth.authority == "ROLE_SITE_USER") {
          this.router.navigate(['/tenant']);
        } else if (this.decoded.auth.authority == "ROLE_ADMIN") {
          this.router.navigate(['/admin']);
        } else if (this.decoded.auth.authority == "ROLE_CLIENT_MASTER") {
          this.router.navigate(['/clientadmin']);
        } else if (this.decoded.auth.authority == "ROLE_SITE_ADMIN") {
          this.router.navigate(['/siteadmin']);
        }
      }
    }
  }

  getJwtToken(): string {
    return this.token;
  }

  getDecodedToken() {
    return this.decoded;
  }

  refreshToken(): Observable<any> {
    console.log('start in refresh token');
    console.log(this.decoded.sub);
    return this.http.get<any>(`${this.ip.ip}:2137/admintask/users/generateToken/${this.decoded.sub}`).pipe(take(1), tap(res => {
      if (res) {
        this.refresh_Token = res['tokenName'];
        if (this.refresh_Token) {
          localStorage.setItem('token', this.refresh_Token);
          this.token = this.refresh_Token;
        }
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 403) {
        this.logout();
        this.toastr.error("You are no longer AI3O member", "Error");
        this.router.navigate(['/signin']);
      }
    }));
  }

  decodeToken(): boolean {
    if (this.token != null && this.token != undefined && this.token.length != 0) {
      this.decoded = jwt_decode(this.token);
      /* Uppercase for username */
      this.userName = this.decoded.sub.charAt(0).toUpperCase() + this.decoded.sub.slice(1);
	  const role = this.decoded.auth.authority;
      this.rolebase = role;
      this.islogin = Boolean(this.rolebase);
      this.organizationName.next(localStorage.getItem('organizationName'));
	  this.loggedFirstName.next(localStorage.getItem('logfirstName'));
	  this.loggedUserLocation.next(localStorage.getItem('location'));
      return true;
    }
    else
      return false;
  }

  isTokenExpired(token?: string): boolean {
    if (this.decoded == undefined || null) {
      return true;
    }
    if (Date.now() >= this.decoded.exp * 1000) {
      return true;
    }
    else
      return false;
  }

  authenticate(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;');
    return this.http.post(`${this.baseUrl}`, { username, password }, { headers }).pipe(map(res => {
      if (res) {
		  console.log(res);
		this.token = res['token'];
        this.decodeToken();
        const email = res['email'];
        localStorage.setItem('token', this.token);
        localStorage.setItem('email', email);
        this.datashare.email.next(email);
        localStorage.setItem('organizationName', res['organizationName']);
        this.organizationName.next(res['organizationName']);
		this.loggedFirstName.next(res['firstname']);
		this.loggedUserLocation.next(res['location']);
        console.log("datashare.email ", this.datashare.email);
        this.islogin = Boolean(this.rolebase);
        return true;
      }
      else
        return false;
    }), catchError(this.errHandler.handleError));
  }

  getUserDetails(username: string): Observable<Register> {
    return this.http.get<Register>(`${this.ip.ip}:2137/admintask/users/getUser/${username}`)
      .pipe(catchError(this.errHandler.handleError));
  }

  isUserLoggedIn() {
    if (this.token != null && this.token.length != 0) {
      // console.log(this.isTokenExpired());
      if (!this.isTokenExpired()) {
        const user = this.decoded.auth.authority;
        // console.log("isUserLoggedIn " + Boolean(user));
        return !(user === null);
      } else
        return false;
    } else
      return false;
  }

  isAdminLoggedIn() {
    if (this.token != null && this.token.length != 0) {
      const role = this.decoded.auth.authority;
      return (role === 'ROLE_ADMIN') ? true : false
    } else {
      return false;
    }
  }

  /* without login */
  forgotPassword(userName) {
    return this.http.post(`${this.ip.ip}:2137/admintask/users/forgotPassword/${userName}`, null)
      .pipe(catchError(this.errHandler.handleError));
  }

  resetPassword(username: string, pwd: string) {
    /* const responseType: Object = {
      responseType: 'text'
    } */
    return this.http.put<any>(`${this.ip.ip}:2137/admintask/users/resetPassword/${username}`, { "newPassword": pwd })
      .pipe(catchError(this.errHandler.handleError));
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.token = null;
    this.organizationName.next(null);
    this.cart.cartItemsSent = !this.cart.cartItemsSent;
    this.rolebase = null;
    this.islogin = false;
    this.cart.products = [];
    this.cart.cartIndicationNum = 0;
    this.cart.onInitialCart.next(null);
    this.userDetails.next('');
  }
}
