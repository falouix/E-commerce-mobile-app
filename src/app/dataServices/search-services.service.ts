import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchServicesService {

  constructor(private http:HttpClient){ }
  getSearchResult(s): Observable<any> {
    return( this.http.get(`https://stebouhaha.com/recherche?controller=search&s=test&source=app`));
  }
}
