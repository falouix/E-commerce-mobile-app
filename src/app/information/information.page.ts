import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
    customerData;
    login_customer;
    firstname;
    lastname;
    email;
  constructor(
    public storage: Storage
    ) { }

  async ngOnInit() {
    await this.storage.create();
    this.loadCustomerData();
  }
  loadCustomerData(){
    this.getStorageValue('customeContext').then(result => {
      
    this.setLocalInformation(result);
    }).catch(e => {
      console.log('error: '+ e);
    }); 
  }
 
  setLocalInformation(result){
    
    this.login_customer =result.login_customer;
    this.firstname      =result.firstname;
    this.lastname       =result.lastname;
    this.email          =result.email;
    this.customerData=result ;
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
