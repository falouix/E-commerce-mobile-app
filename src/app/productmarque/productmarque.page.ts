import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {MarquesServicesPage} from 'src/app/dataServices/marques-services/marques-services.page';

import {CategoriesServicesPage} from 'src/app/dataServices/categories-services/categories-services.page';

@Component({
  selector: 'app-productmarque',
  templateUrl: './productmarque.page.html',
  styleUrls: ['./productmarque.page.scss'],
})
export class ProductmarquePage implements OnInit {

  constructor(private loadingCtrl: LoadingController,private router : Router, private route : ActivatedRoute,private MarquesServicesPage : MarquesServicesPage,private CategoriesServicesPage :CategoriesServicesPage) {
    
  }
  qtty : string;
  public productData;
  marque_id = this.route.snapshot.paramMap.get('id');
  productImgSrc;
  pageNbr;
  public currentPage = 0;
  currentProducts;

  ngOnInit() {
    this.loadProductItems();
  }

  async loadProductItems(){
    const loading = await this.loadingCtrl.create({
      message : 'loading..',
      spinner : 'bubbles'
    });
    await loading.present();
    
    this.MarquesServicesPage.getProductsMarque(this.marque_id).subscribe(res =>{
      loading.dismiss();
      console.log('res',res.products);
      this.pageNbr = Math.floor(res.products.length / 12);
      if((res.products.length % 12)>0){
        this.pageNbr = this.pageNbr + 1;
      }
      console.log('res legth',this.pageNbr);
      const testtt = new Array(Math.ceil(res.products.length / 12))
      for (let line = 0; line < testtt.length; line++) {
        
        if(res.products.length - (line * 12) <12){
          testtt[line] = res.products.slice(line * 12, line * 12 + res.products.length - (line * 12) );
        }else{
          console.log(line * 12)
          testtt[line] = res.products.slice(line * 12, line * 12+12 );
        }
      }
      this.productData = testtt;
      
    this.currentProducts = this.productData[this.currentPage];
      console.log(this.currentProducts)
      /*this.productData.product.price = parseFloat(this.productData.product.price).toFixed(2);
      console.log('this.productData.product.associations.images[0].length',this.productData.product)*/
    });
  }
}
