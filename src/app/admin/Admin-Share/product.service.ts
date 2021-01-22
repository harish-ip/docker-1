import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { ErrorHandlerService } from 'src/app/share/service/error-handler.service';
import { Product } from 'src/app/share/model/model';
import { IpService } from 'src/app/share/service/ip.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  productsCount = new BehaviorSubject(0);
  products = [];
  constructor(private http: HttpClient,
    private errHandler: ErrorHandlerService,
    private ip: IpService) { }

  // Get all products

  productsList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.ip.ip}:2151/product/paasproduct/findAllProducts`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Get All Products Count
  AllproductsCount(): Observable<any> {
    return this.http.get<any>(`${this.ip.ip}:2151/product/paasproduct/getProductCount`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Get all unsubscribed products after login against user
  getProductsbyorder(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.ip.ip}:2151/product/paasproduct/newProducts`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }

  // Create Product and not updated in suite list
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.ip.ip}:2151/product/paasproduct/addProduct`, product)
      .pipe(map(res => {
        if (res) {
          console.log(res);
          return res;
        }
      }), catchError(this.errHandler.handleError));
  }

  // Image Upload in create product and edit product
  public uploadImage(image: File, name: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.ip.ip}:2151/product/paasimage/uploadImage/` + name, formData, { responseType: 'text' }).pipe(catchError(this.errHandler.handleError));;
  }

  // Delete product
  deleteProduct(pid): Observable<void> {
    const responseType: Object = {
      responseType: 'text'
    }
    return this.http.delete<void>(` ${this.ip.ip}:2151/product/paasproduct/delete/${pid}`, responseType)
      .pipe(catchError(this.errHandler.handleError));
  }

  // Edit Product
  /*   updateProduct(product: Product): Observable<Product> {
      return this.http.put<Product>(` ${this.ip.ip}:2151/product/paasproduct/updateProduct/${product.suiteId}`, product)
        .pipe(catchError(this.errHandler.handleError));
    }
   */
  //Edit product based on product id
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(` ${this.ip.ip}:2151/product/paasproduct/update`, product)
      .pipe(catchError(this.errHandler.handleError));
  }
  tenantProducts(email): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.ip.ip}:2175/paaslicense/license/${email}`)
      .pipe(retry(2), catchError(this.errHandler.handleError));
  }
}