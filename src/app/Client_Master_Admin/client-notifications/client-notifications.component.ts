import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-notifications',
  templateUrl: './client-notifications.component.html',
  styleUrls: ['./client-notifications.component.css']
})
export class ClientNotificationsComponent implements OnInit {

  collapseNotification = false;


  constructor() { }

  ngOnInit() {
    this.collapseNotification = true
  }

}
