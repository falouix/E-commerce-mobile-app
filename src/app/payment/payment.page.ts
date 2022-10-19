import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Router,ActivatedRoute} from '@angular/router';
import { ProductsServicesPage } from '../dataServices/products-services/products-services.page';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})

export class PaymentPage implements OnInit {

  id_customer;
  login_customer;
  password;
  paymentList : any=[];
  selectedOption;
  id_address_delivery;
  contextclonevar;
  delivery_option = this.route.snapshot.paramMap.get('id');
  customerContext ;
  constructor(
    private route : ActivatedRoute,
    public ProductsServicesPage : ProductsServicesPage,
    public storage: Storage
  ) { }

  async ngOnInit() {
    this.loadPaymentList();
    await this.storage.create();
  } 
  
  async loadPaymentList(){
    this.contextclonevar = await this.getStorageValue('contextCloneOrsomethng').then(result => {
      console.log('result',result)
      return (result);
      }).catch(e => {
        console.log('error: '+ e);
      });
    this.getStorageValue('customeContext').then(result => {
      console.log(result);
      this.id_customer  = result.id;
      this.login_customer = result.login_customer
      this.password = result.realPassword;

      this.getStorageValue('id_address_delivery').then(result => {
        console.log('id_address_delivery',result);
        this.id_address_delivery = result;

        this.ProductsServicesPage.getPaymentOptions(
          this.id_address_delivery,
          this.id_customer,
          this.login_customer,
          this.password,
          this.delivery_option,
          this.contextclonevar.contextCart.id,
        ).subscribe(res=>{
         console.log('res',res)
         let fakeRes=res.arrayPaymentOptions
         let fakePaymentModule=res.PaymentModule;
         console.log('fakeRes',typeof fakeRes);
         Object.entries(fakeRes).forEach((value,key)=>{
          Object.entries(fakePaymentModule).forEach((value1,key)=>{
            let fakeItem :any = value1[1];
          if(fakeItem.name == value[1][0].module_name){
            value[1][0].id_module =fakeItem.id_module;
          }
           })
           console.log(value[1][0]);
          this.paymentList.push(value[1][0])
         })
        })

        }).catch(e => {
          console.log('error: '+ e);
        });
  

      }).catch(e => {
        console.log('error: '+ e);
      });  
   }
   async checkout(){
    console.log(this.selectedOption);
    this.customerContext=await this.getStorageValue('customeContext').then(result => {
      console.log('contextCloneOrsomethng vresult', result);
      return (result);
      }).catch(e => {
        console.log('error: '+ e);
      });
    
      this.customerContext=await this.getStorageValue('contextCloneOrsomethng').then(result => {
        console.log('contextCloneOrsomethng vresult', result.contextCart);
     this.ProductsServicesPage.checkoutPayment(result.contextCart.id,this.selectedOption,this.customerContext.secure_key,this.customerContext.id).subscribe(res=>{
      console.log('res payment : ',res);
    })
        return (result);
        }).catch(e => {
          console.log('error: '+ e);
        });
   }

   //storage section
   async setStorageValue(key: string, value: any): Promise<any> {
    try {
    const result = await this.storage.set(key, value);
    return true;
    } catch (reason) {
    return false;
    }
  }
  async getStorageValue(key: string): Promise<any> {
    try {
    const result = await this.storage.get(key)
;
    return result;
    } catch (reason) {
    return false;
    }
  }
}