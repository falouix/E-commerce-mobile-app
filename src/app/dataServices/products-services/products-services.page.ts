import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import {Observable} from 'rxjs';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-products-services',
  templateUrl: './products-services.page.html',
  styleUrls: ['./products-services.page.scss'],
})

@Injectable({
  providedIn : 'root',
})
export class ProductsServicesPage {
  constructor(private toastController: ToastController,private http:HttpClient){
  }
   

   
  getAllProducts(): Observable<any> {
    //console.log(`https://stebouhaha.com/api/products/${id}?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON`);
    console.log(this.http.get(`https://stebouhaha.com/promotions?source=app`)); 
    return( this.http.get(`https://stebouhaha.com/promotions?source=app`));
  }

  getProductSpecific_prices(id): Observable<any> {
    //console.log(`https://stebouhaha.com/api/products/${id}?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON`);
    //console.log(this.http.get(`https://stebouhaha.com/promotions?source=app`)); 
    return( this.http.get(`https://stebouhaha.com/api/specific_prices/?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON&filter[id_product]=${id}&display=full`));
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
  addProductToCart(id,qty,flag,token,catID,cart_products): Observable<any> {
let  qtyTosend = 0 ; 
if (cart_products){
    cart_products.forEach( (element) => {
  
   if (element.id == id){
    console.log(element);
    qtyTosend = parseInt(qty) + parseInt(element.cart_quantity);
 
   }
  });
}
if (qtyTosend != 0  ){
   console.log('like what : ',id);
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/text');
    headers.append('content-type','application/json');
     let options = { headers:headers};
    return( this.http.post(`https://stebouhaha.com/panier?id_product=${id}&token=""&qty=${qty}&flag=${flag}&id_customization=0&action=update&add=1&reason=appCart&id_customer=18&cartid=${catID}&qtytosend=${qtyTosend}`,options));
  

}else{
  console.log('like what : ',id);
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/text');
  headers.append('content-type','application/json');
   let options = { headers:headers};
  return( this.http.post(`https://stebouhaha.com/panier?id_product=${id}&token=""&qty=${qty}&flag=${flag}&id_customization=0&action=update&add=1&reason=appCart&id_customer=18&cartid=${catID}`,options));

}
 
  
    
  
  }
  deletProductCart(id,catID): Observable<any> {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/text');
    headers.append('content-type','application/json');
     let options = { headers:headers}; 
    return( this.http.post(`https://stebouhaha.com/panier?id_product=${id}&token=""&flagdel=delete&action=update&delete=1&reason=appCart&cartid=${catID}`,options));
  }
  getadressesCart(id_user): Observable<any> {
       
    return( this.http.get(`https://stebouhaha.com/api/addresses/?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON&filter[id_customer]=${id_user}&filter[deleted]=0&display=full`));

  }
  getsingleadresse(id_user,id): Observable<any> {
       
    return( this.http.get(`https://stebouhaha.com/api/addresses/${id}?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON&filter[id_customer]=${id_user}&filter[deleted]=0&display=full`));

  }
 addadresseCart(id_user,urldata): Observable<any> {
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/text');
  headers.append('content-type','application/json');
   let options = { headers:headers}; 
    return( this.http.get(`https://stebouhaha.com/adresse?source=app&id_address=0&${urldata}&id_customer=${id_user}`,options));

  }

  deletadresse(id,id_user): Observable<any> {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/text');
    headers.append('content-type','application/json');
     let options = { headers:headers}; 
     return( this.http.get(`https://stebouhaha.com/adresse?source=app&id_address=${id}&delete=1&id_customer=${id_user}&token=5aa0980905de7fd1ff75aa90261d9800`,options));
    }
  

    updateadresse(id,id_user,urldata): Observable<any> {
      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/text');
      headers.append('content-type','application/json');
       let options = { headers:headers}; 
       //return( this.http.get(`https://stebouhaha.com/adresse?source=app&id_address=${id}&delete=1&id_customer=${id_user}&token=5aa0980905de7fd1ff75aa90261d9800`,options));
       return( this.http.get(`https://stebouhaha.com/adresse?appaction=updateaddress&id_address=${id}&${urldata}&id_customer=${id_user}`,options));
      }

    getDeliveryAdrs(id_address_delivery,id_customer,login_customer,password): Observable<any> {
      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/text');
      headers.append('content-type','application/json');
       let options = { headers:headers}; 
        return( this.http.get(`https://stebouhaha.com/commande?source=app&id_address_delivery=${id_address_delivery}&id_customer=${id_customer}&confirm-addresses=1&login_customer=${login_customer}&password=${password}&continue=1`,options));
      }

      getPaymentOptions(id_address_delivery,id_customer,login_customer,password,delivery_option): Observable<any> {
        var headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/text');
        headers.append('content-type','application/json');
         let options = { headers:headers}; 
          return( this.http.get(`https://stebouhaha.com/commande?source=app&id_address_delivery=${id_address_delivery}&id_customer=${id_customer}&confirm-addresses=1&login_customer=${login_customer}&password=${password}&continue=1&delivery_option[41]=${delivery_option}&confirmDeliveryOption=1`,options));
        }
        checkoutPayment(id_cart,id_module,key,id_customer): Observable<any> {
          var headers = new HttpHeaders();
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/text');
          headers.append('content-type','application/json');
           let options = { headers:headers}; 
            return( this.http.get(`https://stebouhaha.com/confirmation-commande?source=app&id_cart=${id_cart}&id_module=${id_module}&key=${key}&id_customer=${id_customer}`,options));
          }
}
