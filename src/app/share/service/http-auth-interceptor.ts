import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private auth: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokenvalue = localStorage.getItem('token');
    if (tokenvalue) {
      req = this.addToken(req, tokenvalue);
    }

    return next.handle(req).pipe(catchError(error => {
      if ((error instanceof HttpErrorResponse && error.status == 401)) {
        console.log('token in interceptor', tokenvalue);
        if (tokenvalue) {
          // console.log('entered in before handle 401 Error');
          return this.handle401Error(req, next);
        } else {
          // console.log('entered in if else in interceptor');
          return throwError(error);
        }
      } else {
        console.log('entered in else in interceptor');
        return throwError(error);
      }
    }))
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `${token}`
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.auth.refreshToken().pipe(
        switchMap((token: any) => {
          this.refreshTokenSubject.next(token['tokenName']);
          /*  console.log(this.refreshTokenSubject); */
          this.auth.token = token['tokenName'];
          return next.handle(this.addToken(request, token['tokenName']));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          console.log("switchMap");
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

}
