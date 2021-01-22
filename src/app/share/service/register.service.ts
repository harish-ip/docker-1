import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Register, Contactus } from '../model/model';
import { ErrorHandlerService } from './error-handler.service';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  //Notifications
  notificationCount = new BehaviorSubject(0);
  clickNotification = new BehaviorSubject(false);
  notification: Contactus = null;
  clientNotificationsCount = new BehaviorSubject(0);
  clickClientNotication = new BehaviorSubject(false);

  //sent items
  sentItems: Contactus = null;


  /* counts in client Master */
  siteAdminsCount = new BehaviorSubject(0);
  siteUsersCount = new BehaviorSubject(0);
   compUsersCount = new BehaviorSubject(0);
  clientEmailsCount = new BehaviorSubject(0);
  clientProductsCount = new BehaviorSubject(0);
  companyUsersCount = new BehaviorSubject(0);

  /* count in site Admin */
  siteAdminUserCount = new BehaviorSubject(0);
  siteProductsCount = new BehaviorSubject(0);

  // upload image
  uploadimage = new BehaviorSubject(false);
  userimage: Register = null;


  baseUrl = this.ip.ip + ":2137/admintask/users/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient,
    private err: ErrorHandlerService,
    private ip: IpService) { }

  // Register the User
  Security(register: Register): Observable<Register> {
    console.log(register);
    return this.http.post<Register>(this.ip.ip + ":8093/iaassmssecurity/api/registration", register, this.httpOptions).pipe(
      catchError(this.err.handleError)
    );
  }

  // Get all countries
  getCountries(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "getCountries", this.httpOptions).pipe(
      catchError(this.err.handleError)
    );
  }

  // Get states based on country id
  getStates(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + `getStates/${id}`, this.httpOptions).pipe(
      catchError(this.err.handleError)
    );
  }

  // Get cities based on state id
  getCities(id: number) {
    return this.http.get<any>(this.baseUrl + `getCities/${id}`, this.httpOptions).pipe(
      catchError(this.err.handleError)
    );
  }

  // Get all SITE_ADMIN and ROLE_SITE_USER belong to particular CLIENT_ADMIN
  getAllUsersBasedOnClientMaster(username: string) {
    return this.http.get<any>(this.baseUrl + `getAdminsAndUsers/${username}`, this.httpOptions).pipe(
      catchError(this.err.handleError)
    );
  }

  // get users by role
  getUsersByRole(role: string) {
    return this.http.get<any>(this.baseUrl + `getUsersByRole/${role}`, this.httpOptions).pipe(
      catchError(this.err.handleError)
    );
  }

  // get site admins belong to particular client master
  getSiteAdmins(client_master: string): Observable<Register[]> {
    return this.http.get<any>(this.baseUrl + `getSiteAdmins/${client_master}`, this.httpOptions).pipe(
      catchError(this.err.handleError)
    );
  }

  // get site users belong to particular site admin and client master
  getSiteUsers(client_master: string, Site_admin: string): Observable<Register[]> {
    return this.http.get<any>(this.baseUrl + `getSiteUsers/${client_master}/${Site_admin}`, this.httpOptions).pipe(
      catchError(this.err.handleError)
    );
  }

  // get site users belong to particular site admin in site admin login 
  getSiteadminUsers(Site_admin: string): Observable<Register[]> {
    return this.http.get<any>(this.baseUrl + `getAdminUsers/${Site_admin}`, this.httpOptions).pipe(
      catchError(this.err.handleError)
    );
  }

  // Is tenant exist or not
  isUserExist(uname): Observable<string> {
    return this.http.get<string>(this.baseUrl + 'isUser/' + uname).pipe(catchError(this.err.handleError));
  }

  // Is email exist or not
  isEmail(email): Observable<string> {
    return this.http.get<string>(this.baseUrl + 'emailExist/' + email).pipe(catchError(this.err.handleError));
  }

  // ContactUs form submission
  isContact(contactus: Contactus): Observable<any> {
	  alert('Contact Us');
    return this.http.post<Contactus>(this.baseUrl + "submitContactUsForm", contactus, this.httpOptions).pipe(
      catchError(this.err.handleError)
    )
  }

  // Every Dashboard page image upload
  uploaduserimage(user: Register): Observable<any> {
    return this.http.put<Register>(this.baseUrl + `user/update`, user).pipe(
      catchError(this.err.handleError))
  }

  // Get the contactus notificatins in SUPER_ADMIN
  isEmailData(): Observable<Contactus[]> {
    return this.http.get<Contactus[]>(this.baseUrl + "getNewNotifications").pipe(
      catchError(this.err.handleError));
  }

  // Read the contactus notifications in SUPER_ADMIN
  openNotification(notificationId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `readNotification/${notificationId}`).pipe(
      catchError(this.err.handleError));
  }

  // Get the unread contactus notifications count in SUPER_ADMIN
  allNotificationCount(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "getNotificationCount").pipe(
      catchError(this.err.handleError));
  }

  // Delete contactus notification in SUPER_ADMIN
  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `deleteNotification/${notificationId}`).pipe(
      catchError(this.err.handleError));
  }

  // Reply to the contactus notification in SUPER_ADMIN
  replyNotification(contactus: Contactus): Observable<any> {
    return this.http.post<any>(this.baseUrl + `reply`, contactus).pipe(
      catchError(this.err.handleError));
  }

  //Client-master notifications
  clientNotifications(email: string): Observable<Contactus[]> {
    console.log(email);
    return this.http.get<Contactus[]>(this.baseUrl + `getUserNotifications/${email}`).pipe
      (catchError(this.err.handleError));
  }

  //Client-master notifications
  clientOpenNotification(notificationId): Observable<any> {
    console.log(notificationId);
    return this.http.get<any>(this.baseUrl + `readUserNotification/${notificationId}`).pipe
      (catchError(this.err.handleError));
  }

  //Client-master notifications
  deleteClientNotifications(notificationId): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `deleteUserNotification/${notificationId}`).pipe
      (catchError(this.err.handleError));
  }

  //Client-master notifications
  clientNotificationCount(email: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `getUserNotificationsCount/${email}`).pipe
      (catchError(this.err.handleError));
  }

  /* counts starts */

  // site Admins count in client master page
  getSiteAdminsCount(clientAdminName: string): Observable<number> {
    return this.http.get<number>(this.baseUrl + `getSiteAdminsCount/${clientAdminName}`).pipe
      (catchError(this.err.handleError));
  }

  // Site User count in client master admin
  getSiteUsersCount(clientMasterName): Observable<number> {
    return this.http.get<any>(`${this.baseUrl}getSiteUsersCount/${clientMasterName}`)
      .pipe(catchError(this.err.handleError));
  }
   getClientMasteruserCount(email: string): Observable<number> {
   return this.http.get<any>(`${this.baseUrl}getClientMasteruserCount/${email}`)
      .pipe(catchError(this.err.handleError));
  }
  // Client Emails count 
  getClientEmailsCount(clientMasterName): Observable<number> {
    return this.http.get<any>(`${this.baseUrl}getAdminsAndUsersCount/${clientMasterName}`)
      .pipe(catchError(this.err.handleError));
  }

  // client master subscribed products count
  getClentMasterProductsCount(username): Observable<any> {
    return this.http.get<any>(this.ip.ip + `:2175/paaslicense/license/subscribedProductsCount/${username}`).pipe(
      catchError(this.err.handleError)
    );
  }

  //site Admin users count
  getSiteAdminUsersCount(siteMasterName): Observable<number> {
    return this.http.get<any>(this.baseUrl + `getAdminUsersCount/${siteMasterName}`).pipe(
      catchError(this.err.handleError)
    );
  }

  //Sent mails starts
  isSentMails(email: string): Observable<Contactus[]> {
    return this.http.get<Contactus[]>(this.baseUrl + `getSentMails/${email}`).pipe(
      catchError(this.err.handleError)
    );
  }

  openSentMail(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `readSentMail/${id}`).pipe(
      catchError(this.err.handleError)
    );
  }

  getDeleteSentMail(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `deleteSentMail/${id}`).pipe(
      catchError(this.err.handleError)
    );
  }
  
  getCompanyuserCount(email: string): Observable<number> {
   return this.http.get<any>(`${this.baseUrl}getClientMasteruserCount/${email}`)
      .pipe(catchError(this.err.handleError));
  }
  
}
