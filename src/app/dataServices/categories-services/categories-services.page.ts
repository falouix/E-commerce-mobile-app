import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
  getCategory(id,pageNbr): Observable<any> {
    console.log(`https://stebouhaha.com/category_app?id_category=${id}page=${pageNbr}`);
     return( this.http.get(`https://stebouhaha.com/category_app?id_category=${id}&page=${pageNbr}`));
  }
  getsubCategory(id): Observable<any> {
    console.log(`https://stebouhaha.com/api/categories?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON&filter[active]=1&display=[id,name]&filter[id_parent]=${id}`);
     return( this.http.get(`https://stebouhaha.com/api/categories?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON&filter[active]=1&display=[id,name]&filter[id_parent]=${id}`));
  }

}
