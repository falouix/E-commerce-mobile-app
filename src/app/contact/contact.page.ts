import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  constructor(private http:HttpClient){ 
  }

  ngOnInit() {
    this.sendMail();
  }
  sendMail(){
    console.log('we should do t here')
    console.log('sujet : ',this.sujet);
    console.log('E-mail : ',this.email);
    console.log('message : ',this.message);
    console.log( this.http.get(`https://stebouhaha.com/mailingApp/test.php`));
  }
}
