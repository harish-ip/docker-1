import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from 'src/app/share/service/error-handler.service';
import { IpService } from 'src/app/share/service/ip.service';
import { mail } from 'src/app/share/model/model';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  emailStorage = new BehaviorSubject(false);
  emailData: mail = {
    body: '',
    subject: ''
  };

  constructor(private http: HttpClient,
    private errHandler: ErrorHandlerService,
    private ip: IpService) { }

  // Send mails to multiple users
  sendMail(subject, msg, emailFrom, selectedValue): Observable<any> {
    return this.http.post<any>(`${this.ip.ip}:2137/admintask/users/sendMail`, { "subject": subject, "message": msg, "emailFrom": emailFrom, "emails": selectedValue })
      .pipe(catchError(this.errHandler.handleError));
  }

}
