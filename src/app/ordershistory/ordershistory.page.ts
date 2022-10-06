import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CustomerServicesPage } from '../dataServices/customer-services/customer-services.page';
@Component({
  selector: 'app-ordershistory',
  templateUrl: './ordershistory.page.html',
  styleUrls: ['./ordershistory.page.scss'],
})
export class OrdershistoryPage implements OnInit {
  customerData;
  ordersData;
  ordersStates;
  constructor(public storage: Storage,public CustomerServicesPage : CustomerServicesPage) { }

  async ngOnInit() {
    await this.storage.create();
    
  }
  ionViewDidEnter() {
    this.loadCustomerData();
  }
  loadCustomerData(){
    this.CustomerServicesPage.getOrderStates().subscribe(res=>{
      this.ordersStates = res.order_states;
      //console.log('this.ordersStates',this.ordersStates)
    });
    this.getStorageValue('customeContext').then(result => {
      this.customerData = result;
      this.CustomerServicesPage.getOrders(result.id).subscribe(res=>{
        this.ordersData = res.orders;
        Object.entries(this.ordersData).forEach((item)=>{
          let fakeItem : any = {};
          fakeItem = item[1];
          console.log(fakeItem.current_state)
          this.ordersStates.find(item=>{
            if(item.id == fakeItem.current_state){
               console.log(item);
               fakeItem.stateName = item.name;
               fakeItem.stateColor = item.color;

            }
          })
          const myArray = fakeItem.date_upd.split(" ");  
          fakeItem.date_1 =  myArray[0];
          const myArray1 = fakeItem.date_1.split("-");
          fakeItem.date_11 = myArray1[0]
          fakeItem.date_12 = myArray1[1]
          fakeItem.date_13 = myArray1[2]
          
          //console.log(parseFloat(fakeItem.price_tax_exc).toFixed(3))
          fakeItem.formated_total_paid = parseFloat(fakeItem.total_paid).toFixed(3).toString();
          item[1] = fakeItem;
        })
      })

    }).catch(e => {
      console.log('error: '+ e);
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
