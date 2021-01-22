import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenant-notifications',
  templateUrl: './tenant-notifications.component.html',
  styleUrls: ['./tenant-notifications.component.css']
})
export class TenantNotificationsComponent implements OnInit {

  collapseNotification = false;

  constructor() { }

  ngOnInit() {
    this.collapseNotification = true;
  }

}
