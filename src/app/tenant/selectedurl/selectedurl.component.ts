import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/share/service/data-share.service';
import { Product } from 'src/app/share/model/model';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'app-selectedurl',
  templateUrl: './selectedurl.component.html',
  styleUrls: ['./selectedurl.component.css']
})
export class SelectedurlComponent implements OnInit {

  selectedProd: Product;
  token: string;
  constructor(private data: DataShareService,
    private auth: AuthenticationService) { }

  ngOnInit() {
    const prod = JSON.parse(localStorage.getItem('selectedProd'));
    this.selectedProd = prod;
    console.log("selectedProd", this.selectedProd);
    this.token = this.auth.token;
  }

}
