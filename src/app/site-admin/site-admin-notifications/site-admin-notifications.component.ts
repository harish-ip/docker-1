import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-admin-notifications',
  templateUrl: './site-admin-notifications.component.html',
  styleUrls: ['./site-admin-notifications.component.css']
})
export class SiteAdminNotificationsComponent implements OnInit {

  collapseNotification = false;

  constructor() { }

  ngOnInit() {
    this.collapseNotification = true;
  }

}
