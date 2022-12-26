import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
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
    return( this.http.get(`${environment.apiUrl}api/manufacturers/?ws_key=${environment.ApiKey}&output_format=JSON`));
  }
  getMarque(id): Observable<any> {
    return( this.http.get(`${environment.apiUrl}api/manufacturers/${id}?ws_key=${environment.ApiKey}&output_format=JSON`));
  }
  getProductsMarque(id,customerId):Observable<any>{
    console.log('services : ',customerId)
    if(customerId !=null){
      return(
        this.http.get(`
        ${environment.apiUrl}brand/${id}?source=app&id_customer=${customerId}&logged=1
        `)
      )

    }else{
      return(
        this.http.get(`
        ${environment.apiUrl}brand/${id}?source=app&logged=0
        `)
        )
    }

  }
}
