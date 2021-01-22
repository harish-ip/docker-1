import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class IpService {
  constructor() { }
  ip: string = window['ipAddress'] || "http://54.90.104.27";
}

/* 192.168.10.57 */
/* 18.215.4.80 */
/* 192.168.10.33
14.143.13.66 */