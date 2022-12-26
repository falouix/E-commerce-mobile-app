import { Component, OnInit,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import {Router,ActivatedRoute} from '@angular/router';
import { ProductsServicesPage } from '../dataServices/products-services/products-services.page';
import { DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})

export class PaymentPage implements OnInit {
  paymeeUrl :any ;
  paymentstatus = false;
  showpayme = false;
  id_customer;
  paymee_form;
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
    public storage: Storage,
    public sanitizer: DomSanitizer,
    private router: Router,
    private iab: InAppBrowser
  ) { }
  async ngOnInit() {
    this.loadPaymentList();
    await this.storage.create();
  } 
  onLoadFunc(myIframe){
    console.log('this.router.ur',myIframe);
  }
  async loadPaymentList(){
    this.contextclonevar = await this.getStorageValue('contextCloneOrsomethng').then(result => {
      console.log('result',result)
      return (result);
      }).catch(e => {
        console.log('error: '+ e);
      });
    this.getStorageValue('customeContext').then(result => {
      this.id_customer  = result.id;
      this.login_customer = result.login_customer
      this.password = result.realPassword;
      this.getStorageValue('id_address_delivery').then(result => {
        this.id_address_delivery = result;
        this.ProductsServicesPage.getPaymentOptions(
          this.id_address_delivery,
          this.id_customer,
          this.login_customer,
          this.password,
          this.delivery_option,
          this.contextclonevar.contextCart.id,
        ).subscribe(res=>{
         
         let fakeRes=res.arrayPaymentOptions
         let fakePaymentModule=res.PaymentModule;
         Object.entries(fakeRes).forEach((value,key)=>{
          Object.entries(fakePaymentModule).forEach((value1,key)=>{
            let fakeItem :any = value1[1];
          
          if(fakeItem.name == value[1][0].module_name){
            value[1][0].id_module =fakeItem.id_module;
          }
           })
           if(value[1][0].module_name == 'paymee'){
            const el = document.createElement('div');
            el.innerHTML = value[1][0].form;
          el.setAttribute('title', 'my-title')
            let test = document.getElementById(`top-container`);
            test?.appendChild(el);
           }
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
    if(!this.selectedOption){
      
      this.showpayme = true;
        let payment_token = document.querySelector<HTMLInputElement>('input[name="payment_token"]').value;
        let url_ok = document.querySelector<HTMLInputElement>('input[name="url_ok"]').value;
        let url_ko = document.querySelector<HTMLInputElement>('input[name="url_ko"]').value;
          this.ProductsServicesPage.paymentPaymee(this.contextclonevar.cart.totals.total.amount).subscribe(data => {
            this.paymeeUrl =data;
            let dumpToke = this.paymeeUrl.token;
            this.paymeeUrl =this.sanitizer.bypassSecurityTrustResourceUrl('https://app.paymee.tn/gateway/'+this.paymeeUrl.token) ;
            //console.log('sanitizer : ',this.paymeeUrl.changingThisBreaksApplicationSecurity)
            let browser = this.iab.create(this.paymeeUrl.changingThisBreaksApplicationSecurity, '_blank', 'location=yes')
            browser.on('loadstop').subscribe(event => {
              console.log(event.url)
              if(event.url.includes('/loader')){
                browser.close()
                this.ProductsServicesPage.paymeecheckPayment(dumpToke).subscribe(async res=>{
                  console.log('result from checking if the payment done',JSON.stringify(res));
                  let result : any = {};
                  result =JSON.parse(JSON.stringify(res));
                  console.log('result.status', result.status)
                  console.log('result.data.payment_status', result.data.payment_status)
                  if(result.status == 'true'){
                    if(result.data.payment_status == 'true'){
                      console.log('it should be done here');
                      this.customerContext=await this.getStorageValue('contextCloneOrsomethng').then(result => {
                        this.ProductsServicesPage.paymentClone(result.contextCart.id,this.customerContext.secure_key,this.customerContext.id).subscribe(res=>{ 
                          this.router.navigateByUrl(`ordershistory`);
                        })
                    })
                    }else{
                      this.paymentstatus = true;
                    }
                  }
                })
              }
           });
            return(data['_body']);
           }, error => {
            console.log(error);
          });
    }else{
      this.customerContext=await this.getStorageValue('customeContext').then(result => {
        return (result);
        }).catch(e => {
          console.log('error: '+ e);
        });
        this.customerContext=await this.getStorageValue('contextCloneOrsomethng').then(result => {
          this.ProductsServicesPage.checkoutPayment(this.selectedOption,result.contextCart.id,this.customerContext.secure_key,this.customerContext.id).subscribe(res=>{ 
        })
      this.removeStorageValue('contextCloneOrsomethng').then(res=>{
        if(res){
          this.router.navigateByUrl(`ordershistory`);
        }
      })
        return (result);
      }).catch(e => {
        console.log('error: '+ e);
      });
    }
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
    const result = await this.storage.get(key);
    return result;
    } catch (reason) {
    return false;
    }
  } 
  async removeStorageValue(key: string): Promise<any> {
    try {
      await this.storage.remove(key);
      return true;
    } catch (reason) {
    return false;
    }
  }
}