import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
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
    return( this.http.get(`${environment.apiUrl}recherche?controller=search&s=${s}&source=app`));
  }

}
