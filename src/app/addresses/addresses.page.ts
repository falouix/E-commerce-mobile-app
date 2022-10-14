import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';
import { CustomerServicesPage } from '../dataServices/customer-services/customer-services.page';
import {ProductsServicesPage} from 'src/app/dataServices/products-services/products-services.page';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {
  addressesData : any = [];
  customeContext;
  
currentUserinfo ;
firstname ;
lastname ;
adresseslist;
  constructor(public CustomerServicesPage : CustomerServicesPage,
    public storage : Storage,
    private router : Router, 
     private ProductsServicesPage : ProductsServicesPage,
      ) { }

  async ngOnInit() {
    await this.storage.create();
    this.loadAddresses()
    this.currentUserinfo = await   this.getStorageValue('customeContext').then(result => {
      // console.log('customeContext' , result);
 return result;
 
 }).catch(e => {
       console.log('error: '+ e);
     }); 
 
     this.firstname = this.currentUserinfo.firstname;
     this.lastname = this.currentUserinfo.lastname;
  } 
  async loadAddresses(){
    this.customeContext = await this.getStorageValue('customeContext').then(res=>{
       return res
    }).catch(e=>{
      console.log('error: ', e);
    });
    this.ProductsServicesPage.getadressesCart(this.customeContext.id).subscribe(res=>{
      console.log('res addresses',res.addresses);
      this.addressesData = res.addresses;
      console.log(this.addressesData)
  });
  }


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

  deletAddress(id){
    let id_user = this.currentUserinfo.id;
    this.ProductsServicesPage.deletadresse(id,id_user).subscribe(res =>{
   if(res.success ){
    this.ProductsServicesPage.getadressesCart(this.currentUserinfo.id).subscribe(res =>{
      this.adresseslist = res.addresses;  
    });   
   }
    });
  }
  editAddress(id){

    this.router.navigateByUrl(`/singleaddress/${id}`);

  }


}
