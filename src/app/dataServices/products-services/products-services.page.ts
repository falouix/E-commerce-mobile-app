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
     return( this.http.get(`https://stebouhaha.com/api/products/?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON&display=full&limit=6`));
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
    console.log(`https://stebouhaha.com/panier?id_product=${id}&qty=${qty}&flag=${flag}&id_customization=0&action=update&add=1&reason=appCart`);
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/text');
    headers.append('content-type','application/json');
     let options = { headers:headers};

    let postData = {
      id_product: id,
      id_customization: 0,
      qty : 1,
      add : 1,
      token : flag,
      action : 'update',
    }
    return( this.http.post(`https://stebouhaha.com/panier?id_product=${id}&token=${token}&qty=${qty}&flag=${flag}&id_customization=0&action=update&add=1&reason=appCart&token=""&cartid=${catID}`,options));
  }
}
