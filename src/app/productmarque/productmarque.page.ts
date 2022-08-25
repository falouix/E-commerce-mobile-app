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
  paginationArray = [];
  manufacturer_name;

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
      console.log('testtt',testtt)
    this.currentProducts = this.productData[this.currentPage];
      Object.entries(this.productData).forEach( (value,key) =>{
        this.paginationArray.push(key+1)
        Object.entries(value[1]).forEach( (value,key) =>{
          // get prices ready to displat
          value[1].realPrice = value[1].price
          value[1].price = (parseFloat(value[1].price).toFixed(2).toString() + ' TND');
          // get images for each product
          if(value[1].associations.images){
            console.log(value[1])
            value[1].productImgSrc = 'https://stebouhaha.com/api/images/products/'+
            value[1].id+
            '/'+
            value[1].associations.images[0].id+
            '?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON';
          }else{
            value[1].productImgSrc ="../../assets/holder.jpg";
          }
        });
      });
      this.manufacturer_name=this.currentProducts[0].manufacturer_name;
      console.log('paginationArray',this.paginationArray)
    });

  }
  renderProduct(id){
    this.router.navigateByUrl(`/product/${id}`);
  }
  paginationClick(id){
    console.log(id)
    this.currentProducts = this.productData[id-1];
    console.log(this.currentProducts)
  }
}
