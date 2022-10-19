import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Router,ActivatedRoute} from '@angular/router';
import { ProductsServicesPage } from '../dataServices/products-services/products-services.page';
@Component({ 
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.page.html',
  styleUrls: ['./delivery-list.page.scss'],
})
export class DeliveryListPage implements OnInit {
  selectedDelivery; 
   id_customer;
   login_customer;
   password;
   contextclonevar;
  id_address_delivery = this.route.snapshot.paramMap.get('id');
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    public ProductsServicesPage : ProductsServicesPage,
    public storage: Storage
  ) { }
  category_id = this.route.snapshot.paramMap.get('id_delivery');
  deliveryList : any = [];
  async ngOnInit() {
    await this.storage.create();
    this.loadDeliveryList();
    this.setStorageValue('id_address_delivery',this.route.snapshot.paramMap.get('id_delivery'));
  }
  async loadDeliveryList(){
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



      this.ProductsServicesPage.getDeliveryAdrs(
        this.route.snapshot.paramMap.get('id_delivery'),
        this.id_customer,
        this.login_customer,
        this.password,
        this.contextclonevar.contextCart.id,
      ).subscribe(res=>{
        console.log('res',res)
        let fakeItem: any = [];
    
        Object.entries(res).forEach(item => {
          console.log('list',item);
          fakeItem = item;
          this.deliveryList.push(fakeItem[1])
        });
         
        console.log(this.deliveryList);
       })
      }).catch(e => {
        console.log('error: '+ e);
      }); 
 
  }
  checkout(id){
    this.router.navigateByUrl(`/payment/${this.selectedDelivery}`);
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
}
