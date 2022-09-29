import { Component, OnInit } from '@angular/core';

import {Router,ActivatedRoute} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 profileData;
 firstname;
 lastname;
 mail;
 login;

  constructor(
    public storage: Storage,
    private loadingCtrl: LoadingController,
    
    private router : Router, 
    private route : ActivatedRoute,
    ) { }
    ngOnDestroy(){
      console.log("destroying child...2")
    }
  async ngOnInit() {
   
    await this.storage.create();
    this.loadProfileData();
  }
  async loadProfileData(){
    const loading = await this.loadingCtrl.create({
      message : 'loading..',
      spinner : 'lines-sharp'
    });
    //await loading.present();
    this.profileData = await this.getStorageValue('customeContext').then(result => {
       //loading.dismiss();
       console.log('result',result)
       if(result == null){
        this.router.navigateByUrl(`/login`);
       }else{
        return (result);
       }
      }).catch(e => {
        console.log('error: '+ e);
      });
      this.profileData = this.profileData;
      this.firstname = this.profileData.firstname;
      this.lastname = this.profileData.lastname;
      this.mail = this.profileData.email;
      this.login = this.profileData.login_customer;
      console.log('profileData : ',this.profileData);
  }
  getCustomerInformation(){
    this.router.navigateByUrl(`/information`);
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
