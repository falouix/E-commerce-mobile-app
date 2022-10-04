import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CustomerServicesPage} from 'src/app/dataServices/customer-services/customer-services.page';
import {format,parseISO } from 'date-fns';
import { CommonModule } from '@angular/common';
import { Storage } from '@ionic/storage';

import { LoadingController,AlertController  } from '@ionic/angular';
@Component({ 
  imports: [
  CommonModule,
],
providers: [],
  selector: 'app-inscrit',
  templateUrl: './inscrit.page.html',
  styleUrls: ['./inscrit.page.scss'],
})

export class InscritPage implements OnInit {
  modes = ['date','date-time','month','month-year','time','time-date','year'];
  selectedMode='date';
  dateValue = format(new Date() , 'dd-MM-yyy' );
  formatedString = '';
  prenom : string;
  login : string;
  nom : string;
  mail : string;
  password : string;
  datenaissance : string;
  titre;
  psgdr;
  testpsgdr : boolean = false;
  testlogin  : boolean = false;
  testtitre: boolean = false;
  testprenom: boolean = false;
  testnom: boolean = false;
  testmail: boolean = false;
  testpassword: boolean = false;
  showPicker = false;
  login_customerError;
  firstnameError;
  lastnameError;
  emailError;
  passwordError;
  login_customer=false;
  firstname=false;
  lastname=false;
  email=false;
  password1=false;
  constructor(
      private loadingCtrl: LoadingController,
      public storage: Storage,
      private CustomerServicesPage : CustomerServicesPage,
      private router:Router
    ) { }
 
  async ngOnInit() { 
    await this.storage.create();
    this.setDate();
  }
  async createAccount(){
    const loading = await this.loadingCtrl.create({
      message : 'loading..',
      spinner : 'lines-sharp'
    });
    await loading.present();
    if(!this.psgdr){
      this.testpsgdr = true;
      loading.dismiss();
    }else{
      this.testpsgdr = false;
      loading.dismiss();
    }
    if(
      this.login == undefined ||
      this.titre == undefined ||
      this.prenom == undefined ||
      this.nom == undefined ||
      this.mail == undefined ||
      this.password == undefined ||
      this.formatedString == ''
    ){
      loading.dismiss();
      this.testlogin =this.login == undefined;
      this.testtitre=this.titre == undefined;
      this.testprenom=this.prenom == undefined;
      this.testnom= this.nom == undefined;
      this.testmail=this.mail == undefined;
      this.testpassword=this.password == undefined;
    }else{
      this.CustomerServicesPage.createAccount(this.login,this.titre,this.prenom,this.nom,this.mail,this.password,this.formatedString,1).subscribe(res =>{
        console.log('data at first',res)
        if(!res.succes){
          res.data.find(item=>{
            if(item.fieldError.length>0){
              console.log(item.fieldName)
              switch (item.fieldName) {
                case 'login_customer':
                  this.login_customerError = item.fieldError[0]; 
                  this.login_customer = true;
                case 'firstname':
                  this.firstnameError =item.fieldError[0];
                  this.firstname = true;
                case 'lastname':
                  this.lastnameError=item.fieldError[0];
                  this.lastname = true;
                case 'email':
                  console.log('email',item.fieldError);
                  this.email = true;
                  this.emailError=item.fieldError[0];
                case "password":
                  this.password1 = true;
                  console.log('password',item.fieldError);
                  this.passwordError = item.fieldError[0];     
            }
            }
            loading.dismiss();
          })
        }
        if(res.succes){
          console.log('customeContext',res.data)
          this.setStorageValue('customeContext',res.data);
          this.setStorageValue('isLoged',true);
          loading.dismiss();
          this.router.navigateByUrl(`/profile`);
        }
      })
    }
  }
  setDate(){
    this.formatedString = format(new Date() , 'dd/MM/yyy' );
  }
  dateChanged(test){
    console.log('something here',test);
    this.formatedString = format(parseISO(test) ,'dd/MM/yyy' );;
  }
  checkValue(psgdr){
    if(psgdr){
      return true;
    }else{
      return false;
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
