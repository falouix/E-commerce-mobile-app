import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public currentActive;
  public appPages = [
    { title: 'login', url: '/login', icon: 'person-circle' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
  ];
  public appPages1 = [
    { title: 'Profile', url: '/profile', icon: 'person-circle' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Déconnexion', url: '/Profile', icon: 'log-out' },
  ];
  menuactive = [];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router : Router,public storage: Storage,) {
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
}
