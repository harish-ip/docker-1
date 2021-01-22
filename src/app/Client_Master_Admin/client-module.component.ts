import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../share/service/data-share.service';

@Component({
  selector: 'app-client-module',
  templateUrl: './client-module.component.html',
  styleUrls: ['./client-module.component.css']
})
export class ClientModuleComponent implements OnInit {

  constructor(private data: DataShareService) {
    this.data.mainLoading.next(false);
  }

  ngOnInit() {
  }

}
