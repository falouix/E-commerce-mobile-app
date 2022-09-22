import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerServicesPage} from 'src/app/dataServices/customer-services/customer-services.page';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})


@Injectable({
  providedIn : 'root',
})

export class ContactPage implements OnInit {

  sujet;
  email;
  message;

  constructor(private http:HttpClient,private CustomerServicesPage:CustomerServicesPage){ 
  }

  ngOnInit() {
    this.sendMail();
  }
  sendMail(){
    console.log('we should do t here')
    console.log('sujet : ',this.sujet);
    console.log('E-mail : ',this.email);
    console.log('message : ',this.message);
    this.CustomerServicesPage.contact(this.sujet,this.email,this.message).subscribe(res =>{
       console.log('res',res.success);
    });
  }
}
