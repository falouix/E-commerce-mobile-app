import { Component, OnInit } from '@angular/core';
import { ProductsServicesPage } from '../dataServices/products-services/products-services.page';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  paymentList : any=[];
  selectedOption;
  constructor(public ProductsServicesPage : ProductsServicesPage) { }

  ngOnInit() {
    this.loadPaymentList();
  }
  loadPaymentList(){
    this.ProductsServicesPage.getPaymentOptions(28,23).subscribe(res=>{
     console.log('res',res)
     let fakeRes=res
     let fakeItem: any = [];

     console.log('fakeRes',typeof fakeRes);
     Object.entries(fakeRes).forEach((value,key)=>{
      console.log('key',key,'value',value[1][0]);
      this.paymentList.push(value[1][0])
     })
    })
   }
   checkout(){
    console.log(this.selectedOption);
   }
}
