import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardWelcomeService {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.token;
    if (currentUser != null) {
      const role = this.authenticationService.decoded.auth.authority;
      if (currentUser && (role == 'ROLE_ADMIN')) {
        // logged in so return true
        this.router.navigate(['admin/dashboard']);
        return false;
      }
    }
    // not logged in so redirect to login page with the return url    
    return true;
  }


}
