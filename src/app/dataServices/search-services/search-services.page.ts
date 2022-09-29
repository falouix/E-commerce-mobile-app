import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-search-services',
  templateUrl: './search-services.page.html',
  styleUrls: ['./search-services.page.scss'],
})

@Injectable({
  providedIn : 'root',
})
export class SearchServicesPage   {

  constructor(private http:HttpClient){ }
  getSearchResult(s): Observable<any> {
    return( this.http.get(`https://stebouhaha.com/recherche?controller=search&s=${s}&source=app`));
  }

}
