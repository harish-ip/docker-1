import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { ErrorHandlerService } from 'src/app/share/service/error-handler.service';
import { Suite, Product } from 'src/app/share/model/model';
import { IpService } from 'src/app/share/service/ip.service';

@Injectable({
  providedIn: 'root'
})

export class SuiteService {

  suiteCount = new BehaviorSubject(0);

  constructor(private http: HttpClient,
    private errHandler: ErrorHandlerService,
    private ip: IpService) { }

  baseUrl = `${this.ip.ip}:2151/product/paasimage/getDBImage/`;

  // Get the all suites
  suitesList(): Observable<Suite[]> {
    return this.http.get<Suite[]>(`${this.ip.ip}:2151/product/paassuite/findAllSuites`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Get the all suites count
  AllsuitesCount(): Observable<any> {
    return this.http.get<any>(`${this.ip.ip}:2151/product/paassuite/getSuiteCount`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Get Image
  getImage(prodName: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + prodName)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Delete Suite
  deleteSuite(id): Observable<void> {
    return this.http.delete<void>(`${this.ip.ip}:2151/product/paassuite/delete/${id}`)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Create Suite
  createSuite(suite: Suite): Observable<Suite> {
    return this.http.post<Suite>(`${this.ip.ip}:2151/product/paassuite/createSuite`, suite)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Edit Suite
  editSuite(suite: Suite): Observable<Suite> {
    console.log(suite);
    return this.http.put<Suite>(`${this.ip.ip}:2151/product/paassuite/updateSuite/${suite.suiteId}`, suite)
      .pipe(catchError(this.errHandler.handleError));
  }

  // created product added in to suite aat the time of product creation
  addProducttoSuite(product: Product, suiteId: number): Observable<Product> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    console.log(product);
    return this.http.post<Product>(`${this.ip.ip}:2151/product/paassuite/addProductIntoSuite/${suiteId}`, product, requestOptions)
      .pipe(catchError(this.errHandler.handleError));
  }

  addProductIntoNewSuite(product: Product, newSuiteId: number, oldSuiteId: number): Observable<Product> {
    console.log(product);
    return this.http.post<Product>(`${this.ip.ip}:2151/product/paassuite/addProductIntoNewSuite/${newSuiteId}/${oldSuiteId}`, product)
      .pipe(catchError(this.errHandler.handleError));
  }
}
