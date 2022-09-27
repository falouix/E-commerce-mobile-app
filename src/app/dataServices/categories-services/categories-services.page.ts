import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-categories-services',
  templateUrl: './categories-services.page.html',
  styleUrls: ['./categories-services.page.scss'],
})
@Injectable({
  providedIn : 'root',
})
export class CategoriesServicesPage {
  constructor(private http:HttpClient){ }
  
  getCategory(id,pageNbr,customerId): Observable<any> {
    console.log(customerId)
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
     let options = { headers:headers};
   if(customerId != null){
    return( this.http.get(`https://stebouhaha.com/category_app?id_category=${id}&page=${pageNbr}&customerid=${customerId}&logged=1`, options));
   }else{
    return( this.http.get(`https://stebouhaha.com/category_app?id_category=${id}&page=${pageNbr}&logged=1`, options));
   }
      }


  getsubCategory(id): Observable<any> {
      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');
       let options = { headers:headers};

          return( this.http.get(`https://stebouhaha.com/api/categories?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON&filter[active]=1&display=[id,name]&filter[id_parent]=${id}`, options));

  }
  checkImg(link): Observable<any> {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
     let options = { headers:headers};

        return( this.http.get(link, options));

}

}
