import { Component, OnInit } from '@angular/core';
import {CustomerServicesPage} from 'src/app/dataServices/customer-services/customer-services.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login : string;
  password : string;
  constructor(private CustomerServicesPage : CustomerServicesPage) { }

  ngOnInit() {
  }
  loginCustomer(){
    console.log('customer should try his signin here');
    console.log('password',this.password);
    if(this.login == undefined || this.password == undefined){
      console.log("there's something not right");
    }else{
      this.CustomerServicesPage.loginAccount(this.login,this.password ).subscribe(res =>{
        console.log('customer result',res.active);
         if(res.active == 1){
          console.log('succes');
         }
      })
    }
  }
  
}
