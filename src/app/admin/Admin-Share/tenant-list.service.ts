import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Register, Product, UniqueProducts } from 'src/app/share/model/model';
import { ErrorHandlerService } from 'src/app/share/service/error-handler.service';
import { IpService } from 'src/app/share/service/ip.service';

@Injectable({
  providedIn: 'root'
})

export class TenantListService {

  tenantsCount = new BehaviorSubject(0);

  /* used in main admin */
  clientMasterAdminCounts = new BehaviorSubject(0);
  siteAdminCount = new BehaviorSubject(0);

  /* used in client master dashboard */
  siteUsersCount = new BehaviorSubject(0);

  constructor(private http: HttpClient,
    private errHandler: ErrorHandlerService,
    private ip: IpService) { }

  // Get the current date from the backend server
  getDate() {
    const responseType: Object = {
      responseType: 'text'
    }
    return this.http.get<string>(`${this.ip.ip}:2151/product/paasproduct/getDate`, responseType)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Get the users list in SUPER_ADMIN Role
  registerTenant(): Observable<Register[]> {
    return this.http.get<Register[]>(`${this.ip.ip}:2137/admintask/users/findAllUsers`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Get the users List Count
  AllregisterTenantCount(): Observable<any> {
    return this.http.get<any>(`${this.ip.ip}:2137/admintask/users/getTenantCount`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  companyUsersCount(username): Observable<void> {
    return this.http.delete<void>(`${this.ip.ip}:2137/getClientMasteruserCount/{username}`)
      .pipe(catchError(this.errHandler.handleError));
  }
  // Delete user
  deleteregisterTenant(username): Observable<void> {
    return this.http.delete<void>(`${this.ip.ip}:2137/admintask/users/delete/${username}`)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Edit user
  editRegisterTenant(register: Register): Observable<Register> {
    return this.http.put<Register>(`${this.ip.ip}:2137/admintask/users/user/update`, register)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Get the user subscribed products in SUPER_ADMIN - extend-subscription component
  tenantProductsByAdmin(userName): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.ip.ip}:2175/paaslicense/license/${userName}`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  //get license with particular fields
  tenantLicenseWithparticularFileds(userName): Observable<UniqueProducts[]> {
    return this.http.get<UniqueProducts[]>(`${this.ip.ip}:2175/paaslicense/license/getLicense/${userName}`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // extend the user subscribed products end date in SUPER_ADMIN - extend-subscription component
  tenantExtendProductPeriod(userName, productId, extendPeriod) {
    return this.http.put<Register>(`${this.ip.ip}:2175/paaslicense/license/extendLicense/${userName}/${productId}/${extendPeriod}`, null)
      .pipe(catchError(this.errHandler.handleError));
  }

  // client master admin count in main admin
  getClientMastersCount(): Observable<number> {
    return this.http.get<any>(`${this.ip.ip}:2137/admintask/users/getClientMastersCount`)
      .pipe(catchError(this.errHandler.handleError));
  }

  // site admin count in main admin
  getSiteAdminsCount(): Observable<number> {
    return this.http.get<any>(`${this.ip.ip}:2137/admintask/users/getSiteAdminsCount`)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Site User count in client master admin
  getSiteUsersCount(clientMasterName): Observable<number> {
    return this.http.get<any>(`${this.ip.ip}:2137/admintask/users/getSiteUsersCount/${clientMasterName}`)
      .pipe(catchError(this.errHandler.handleError));
  }



}
