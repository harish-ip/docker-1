import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PageTitleService {

  constructor() { }

  // Tenant
  tenantTitle: string;

  adminTitle: string;

  // loading Indicator
  isLoding: boolean = false;

  clientMasterTitle: string;

  // used in headerPage
  showSearchBar: string;

}
