import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  getAllProducts(): Observable<any> {
    //console.log(`https://stebouhaha.com/api/products/${id}?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON`);
    console.log(this.http.get(`https://stebouhaha.com/promotions?source=app`)); 
    return( this.http.get(`https://stebouhaha.com/promotions?source=app`));
  }

  getProductSpecific_prices(id): Observable<any> {
    //console.log(`https://stebouhaha.com/api/products/${id}?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON`);
    //console.log(this.http.get(`https://stebouhaha.com/promotions?source=app`)); 
    return( this.http.get(`https://stebouhaha.com/api/specific_prices/?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON&filter[id_product]=${id}&display=full`));
  }



  getProduct(id): Observable<any> {
    //console.log(`https://stebouhaha.com/api/products/${id}?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON`);
     return( this.http.get(`https://stebouhaha.com/api/products/${id}?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON`));
  }
  checkApptoken(): Observable<any> {
    console.log(`https://stebouhaha.com/panier?&source=app`)
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/text');
    headers.append('content-type','application/json');
     let options = { headers:headers};
    return( this.http.get(`https://stebouhaha.com/panier?source=app`,options));

  }
  addProductToCart(id,qty,flag,token,catID): Observable<any> {
    //console.log(`https://stebouhaha.com/panier?id_product=${id}&qty=${qty}&flag=${flag}&id_customization=0&action=update&add=1&reason=appCart`);
    console.log('like what : ',id);
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/text');
    headers.append('content-type','application/json');
     let options = { headers:headers};
    return( this.http.post(`https://stebouhaha.com/panier?id_product=${id}&token=""&qty=${qty}&flag=${flag}&id_customization=0&action=update&add=1&reason=appCart&cartid=${catID}`,options));
  }
}
