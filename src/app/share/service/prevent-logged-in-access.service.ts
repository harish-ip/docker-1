import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class PreventLoggedInAccessService {

  constructor(private authService: AuthenticationService) { }

  canActivate() {
    return !this.authService.isUserLoggedIn();
  }
}
