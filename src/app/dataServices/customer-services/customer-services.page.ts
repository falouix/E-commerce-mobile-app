import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-customer-services',
  templateUrl: './customer-services.page.html',
  styleUrls: ['./customer-services.page.scss'],
})
@Injectable({
  providedIn : 'root',
})
export class CustomerServicesPage {

  constructor(private http:HttpClient){ }
  createAccount(
    login_customer,
    id_gender,
    firstname,
    lastname,
    email,
    password,
    birthday,
    newsletter,
    ): Observable<any> {
    //console.log(`${environment.apiUrl}api/manufacturers/?ws_key=${environment.ApiKey}&output_format=JSON&output_format=JSON`);
     return( this.http.get(`${environment.apiUrl}connexion?create_account=1&login_customer=${login_customer}&id_gender=${id_gender}&firstname=${firstname}&lastname=${lastname}&email=${email}&password=${password}&birthday=${birthday}&optin=1&customer_privacy=1&newsletter=${newsletter}&psgdpr=1&submitCreate=1&source=app&reason=inscrit`));
  }

  loginAccount(
    login_customer,
    password,
    ): Observable<any> {
    //console.log(`${environment.apiUrl}api/manufacturers/?ws_key=${environment.ApiKey}&output_format=JSON&output_format=JSON`);
     return( this.http.get(`${environment.apiUrl}connexion?back=my-account&login_customer=${login_customer}&password=${password}&submitLogin=1&source=app`));
  }
  contact(
    subject,
    mail,
    message
    ): Observable<any> {
    //console.log(`${environment.apiUrl}api/manufacturers/?ws_key=${environment.ApiKey}&output_format=JSON&output_format=JSON`);
     return( this.http.get(`${environment.apiUrl}test_mail.php?subject=${subject}&mail=${mail}&message=${message}`));
  }
  getOrders(id): Observable<any> {
    //console.log(`${environment.apiUrl}api/manufacturers/?ws_key=${environment.ApiKey}&output_format=JSON&output_format=JSON`);
     return( this.http.get(`${environment.apiUrl}api/orders/?ws_key=${environment.ApiKey}&output_format=JSON&filter[id_customer]=${id}&display=full`));
  }
  getOrderStates(): Observable<any> {
    //console.log(`${environment.apiUrl}api/manufacturers/?ws_key=${environment.ApiKey}&output_format=JSON&output_format=JSON`);
     return( this.http.get(`${environment.apiUrl}api/order_states/?ws_key=${environment.ApiKey}&output_format=JSON&display=full`));
  }
  getAddresses(customer_id): Observable<any> {
    //console.log(`${environment.apiUrl}api/manufacturers/?ws_key=${environment.ApiKey}&output_format=JSON&output_format=JSON`);
     return( this.http.get(`${environment.apiUrl}api/addresses/?ws_key=${environment.ApiKey}&output_format=JSON&filter[id_customer]=${customer_id}&display=full`));
  }
}
