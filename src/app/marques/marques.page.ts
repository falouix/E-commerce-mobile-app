import { Component, OnInit } from '@angular/core';

import {Router,ActivatedRoute} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {MarquesServicesPage} from 'src/app/dataServices/marques-services/marques-services.page';

@Component({
  selector: 'app-marques',
  templateUrl: './marques.page.html',
  styleUrls: ['./marques.page.scss'],
})
export class MarquesPage implements OnInit {
  constructor(
      private loadingCtrl: LoadingController,
      private router : Router, 
      private route : ActivatedRoute,
      private MarquesServicesPage : MarquesServicesPage
    ) {

   }
  public manufacturersData;
  public manufacturers = [];
  ngOnInit() {
    this.loadManufacturersItems();
  }
  async loadManufacturersItems(){
    const loading = await this.loadingCtrl.create({
      message : 'loading..',
      spinner : 'bubbles'
    });
    await loading.present();
    this.MarquesServicesPage.getMarques().subscribe(res =>{
      loading.dismiss();
      this.manufacturersData = res;
      this.manufacturersData.manufacturers.forEach( (value) =>{
        this.MarquesServicesPage.getMarque(value.id).subscribe(res =>{
          this.manufacturers.push(res.manufacturer);
        });
      });
    });
  }
  getProductsMarque(id){
    console.log(id)
    this.router.navigateByUrl(`/productmarque/${id}`);
  }

}
