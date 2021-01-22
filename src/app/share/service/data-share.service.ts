import { Injectable } from '@angular/core';
import { Suite, Product, Coupon, Register, mail, Contactus } from '../model/model';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataShareService {

  constructor() { }

  // main loading
  mainLoading = new BehaviorSubject(false);

  // start count
  startCount = new BehaviorSubject(false);

  // when user logouts from view cart page
  // viewCartDeleteProduct = new BehaviorSubject(true);

  // otp
  otp = new BehaviorSubject(null);
  otpUsername = new BehaviorSubject('');

  // Email call in every page
  email = new BehaviorSubject(localStorage.getItem('email'));

  // Used in Header search
  productsSearch: Product[];
  navProdChange: Subject<Product> = new Subject<Product>();

  // userdashboard 
  userdetails = new BehaviorSubject<Register>(JSON.parse(localStorage.getItem('userDetails')) || null);

  // Used in welcome Page
  welcomeShowInitial: boolean = true;
  welcomeSuites: Suite[];
  welcomeProducts: Product[];

  // Products page
  productsShowInitial: boolean = true;
  productsInProductsPage: Product[];

  // Used in Edit Suite and Admin suite list.
  suite: Suite;

  // Used in Admin list of prodcuts & update product
  product: Product;

  // Used in Admin tenants-list & edit-tenant
  anyData;

  //  Get the CouponCode from Coupons List component to the Coupon to Product component
  couponCode;

  // Used in Edit coupon model in Listcoupons component.
  coupon: Coupon;

  // Used in Admin Email tenant-list
  selectedTenantEmails = [];

  // TenantData used in Admin tenant-list
  tenantData: Register = null;

  // subcribed prod on new window
  subcribedProdOnClick: Product;

  // organization name
  orgname = new BehaviorSubject(true);

  // Footer and Header tag hide
  footer = new BehaviorSubject(true);

  //Used in Product Detail Page
  samePageInProd = new BehaviorSubject(false);
  productsdetail: Product = JSON.parse(localStorage.getItem('product'));

  // notification page
  notificationDataList = new BehaviorSubject<Contactus[]>([]);
  notificationSentList = new BehaviorSubject<Contactus[]>([]);

}