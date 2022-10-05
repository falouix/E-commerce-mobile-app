import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';
import { CustomerServicesPage } from '../dataServices/customer-services/customer-services.page';
@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {
  addressesData : any = [];
  customeContext;
  constructor(public CustomerServicesPage : CustomerServicesPage,public storage : Storage ) { }

  async ngOnInit() {
    await this.storage.create();
    this.loadAddresses()
  } 
  async loadAddresses(){
    this.customeContext = await this.getStorageValue('customeContext').then(res=>{
       return res
    }).catch(e=>{
      console.log('error: ', e);
    });
    this.CustomerServicesPage.getAddresses(this.customeContext.id).subscribe(res=>{
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
}
