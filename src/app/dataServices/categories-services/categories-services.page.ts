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

}
