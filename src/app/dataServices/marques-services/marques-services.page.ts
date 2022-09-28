import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-marques-services',
  templateUrl: './marques-services.page.html',
  styleUrls: ['./marques-services.page.scss'],
})
@Injectable({
  providedIn : 'root',
})
export class MarquesServicesPage {
  constructor(private http:HttpClient){ }
  getMarques(): Observable<any> {
    //console.log(`https://stebouhaha.com/api/manufacturers/?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON&output_format=JSON`);
     return( this.http.get(`https://stebouhaha.com/api/manufacturers/?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON`));
  }
  getMarque(id): Observable<any> {
    //console.log(`https://stebouhaha.com/api/manufacturers/?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON&output_format=JSON`);
     return( this.http.get(`https://stebouhaha.com/api/manufacturers/${id}?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON`));
  }
  getProductsMarque(id,customerId):Observable<any>{
    if(customerId !=null){
      return(
        this.http.get(`
        https://stebouhaha.com/brand/${id}?source=app&id_customer${customerId}&logged=1
        `)
      )

    }else{
      return(
        this.http.get(`
        https://stebouhaha.com/brand/${id}?source=app&logged=0
        `)
        )
    }

  }
}
