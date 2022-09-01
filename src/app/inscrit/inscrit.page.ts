import { Component, OnInit } from '@angular/core';
import {CustomerServicesPage} from 'src/app/dataServices/customer-services/customer-services.page';
import {format,parseISO } from 'date-fns';
import { CommonModule } from '@angular/common';
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
  showPicker = false;
  constructor(private CustomerServicesPage : CustomerServicesPage) { }

  ngOnInit() {
    this.setDate();
  }
  createAccount(){
    if(
      this.login == undefined ||
      this.titre == undefined ||
      this.prenom == undefined ||
      this.nom == undefined ||
      this.mail == undefined ||
      this.password == undefined ||
      this.formatedString == ''
    ){
  console.log("there's something not right");
    }else{
      this.CustomerServicesPage.createAccount(this.login,this.titre,this.prenom,this.nom,this.mail,this.password,this.formatedString,1).subscribe(res =>{
        console.log('customer result',res);
      })
    }
  }
  setDate(){
    this.formatedString = format(new Date() , 'dd/MM/yyy' );
  }
  dateChanged(test){
    console.log('something here',test);
    this.formatedString = format(parseISO(test) , 'dd/MM/yyy' );;
  }
}
