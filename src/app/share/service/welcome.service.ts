import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ErrorHandlerService } from './error-handler.service';
import { Suite, Product } from '../model/model';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  private baseUrl = this.ip.ip + ":2151/product/paassuite/";
  private postprodUrl = this.ip.ip + ":2151/product/paasproduct/saveAllUserProducts/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient,
    private handleError: ErrorHandlerService,
    private ip: IpService) { }

  // Get suites and products
  welcomeSuites(): Observable<Suite[]> {
    return this.http.get<Suite[]>(this.baseUrl + "welcomeSuites", this.httpOptions).pipe(
      catchError(this.handleError.handleError));
  }

  // Search products
  searchForProducts(productName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.ip.ip}:2151/product/paasproduct/search/${productName}`).pipe(
      catchError(this.handleError.handleError));
  }
}
