import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ToastController } from '@ionic/angular';
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

  constructor(private toastController: ToastController, private http:HttpClient,private CustomerServicesPage:CustomerServicesPage){ 
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Message envoyer!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }
  ngOnInit() {
  }
  sendMail(){
    console.log('we should do t here')
    console.log('sujet : ',this.sujet);
    console.log('E-mail : ',this.email);
    console.log('message : ',this.message);
    this.CustomerServicesPage.contact(this.sujet,this.email,this.message).subscribe(res =>{
       console.log('res',res.success);
       if(res.success ){
        this.presentToast('bottom')
       }
    });
  }
}
