import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-products-services',
  templateUrl: './products-services.page.html',
  styleUrls: ['./products-services.page.scss'],
})

@Injectable({
  providedIn : 'root',
})
export class ProductsServicesPage {
  constructor(private http:HttpClient){ }
  getProduct(id): Observable<any> {
    console.log(`https://stebouhaha.com/api/products/${id}?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON`);
     return( this.http.get(`https://stebouhaha.com/api/products/${id}?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON`));
  }
}
