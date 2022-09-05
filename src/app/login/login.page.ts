import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import {CustomerServicesPage} from 'src/app/dataServices/customer-services/customer-services.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  profileData;
  login : string;
  password : string;
  constructor(
    private router:Router,
    private CustomerServicesPage : CustomerServicesPage,
    public storage: Storage,
    private loadingCtrl: LoadingController,
    ) {
   }
   ngOnDestroy(){
    console.log("destroying child...")
  }
  async ngOnInit() {
    await this.storage.create();
    this.profileData = await this.getStorageValue('customeContext').then(result => {
       if(result == null){
        this.router.navigateByUrl(`/login`);
       }else{
        this.ngOnDestroy();
        this.router.navigateByUrl(`/profile`);
       }
      }).catch(e => {
        console.log('error: '+ e);
      });
    console.log('just got into login page');
    const loading = await this.loadingCtrl.create({
      message : 'loading..',
      spinner : 'lines-sharp'
    });
  }
  async loginCustomer(){
    const loading = await this.loadingCtrl.create({
      message : 'loading..',
      spinner : 'lines-sharp'
    });
    await loading.present();
    if(this.login == undefined || this.password == undefined){
      console.log("there's something not right");
      loading.dismiss();
    }else{
      this.CustomerServicesPage.loginAccount(this.login,this.password ).subscribe(res =>{
        console.log('customer result',res);
         if(res.success == 1){
          this.setStorageValue('customeContext',res.data);
          loading.dismiss();
          this.router.navigateByUrl(`/profile`);
         }else{
          console.log('some')
         }
      })
    }
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
