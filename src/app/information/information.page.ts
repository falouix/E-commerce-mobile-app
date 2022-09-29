import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
   customerData;
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
    
    console.log('this.customerData',this.customerData)
  }
  async setStorageValue(key: string, value: any): Promise<any> {
    try {
    const result = await this.storage.set(key, value);
    return true;
    } catch (reason) {
    return false;
    }
  }
  setLocalInformation(result){
    
    this.customerData=result ;
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
