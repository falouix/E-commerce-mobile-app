import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public counter_panier = 0;
  public currentActive;
  public appPages = [
    { title: 'login', url: '/login', icon: 'person-circle' },
    { title: 'inscription', url: '/inscrit', icon: 'person-circle' },
  ];
  public appPages1 = [
    { title: 'Profile', url: '/profile', icon: 'person-circle' },
    { title: 'Déconnexion', url: '/logout', icon: 'log-out' },
  ];
  menuactive = [];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router : Router,public storage: Storage,) {
    console.log('this.router.url', this.router.url);
    this.menuactive[1] = true;
    this.menuactive[2] = false;
    this.menuactive[3] = false;
    this.menuactive[4] = false;
    this.menuactive[5] = false;
    
  } 
  
  public IsLoged = this.getIsLoged();
  async getIsLoged(){
    let IsLoged;
    await this.storage.create();
    await this.getStorageValue('customeContext').then(result => {
      if(result == null){
        IsLoged =  false
      }else{
        IsLoged =  true
      }
     }).catch(e => {
       console.log('error: '+ e);
     }); 
     await this.getStorageValue('contextCloneOrsomethng').then(result => {
      if(result == null){
        this.counter_panier =  0
      }else{
        console.log('fucking result : ',result.cart.products_count)
        this.counter_panier = result.cart.products_count;
      }
     }).catch(e => {
       console.log('error: '+ e);
     });
     console.log('IsLoged',IsLoged)
     this.IsLoged = IsLoged;
     return IsLoged;
  }
  btnmenu(i){
    console.log('btnMenu4',i);
    this.menuactive[1] = false;
    this.menuactive[2] = false;
    this.menuactive[3] = false;
    this.menuactive[4] = false;
    this.menuactive[5] = false;
    this.menuactive[i] = true;
    
    if(i == 5){
      setTimeout(function(){
        console.log("waited for: " + i + " seconds");
        window.location.reload();
      }, 500);
      
    }
  }
  btnBack(){
    console.log('clicked');
    history.back();
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
  SearchFunction(e){
    console.log(e)
    this.router.navigateByUrl(`/search/${e}`);
  }
}
