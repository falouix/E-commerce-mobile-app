import { Component, OnInit } from '@angular/core';

import {Router,ActivatedRoute} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {ProductsServicesPage} from 'src/app/dataServices/products-services/products-services.page';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  constructor(private loadingCtrl: LoadingController,private router : Router, private route : ActivatedRoute,private ProductsServicesPage : ProductsServicesPage) {
    
   }
  qtty : string;
  public productData;
  product_id = this.route.snapshot.paramMap.get('id');
  ngOnInit() {
    this.loadProductItems()
  }
  async loadProductItems(){
    const loading = await this.loadingCtrl.create({
      message : 'loading..',
      spinner : 'bubbles'
    });
    await loading.present();
    this.ProductsServicesPage.getProduct(this.product_id).subscribe(res =>{
      loading.dismiss();
      this.productData = res;
      this.productData.product.price = parseFloat(this.productData.product.price).toFixed(2);
      console.log("res : ",parseFloat(this.productData.product.price).toFixed(2))
    });
  }
  clicktest(id,pageNbr){
    this.router.navigateByUrl(`/product/${id}`);
  }

  plusBtnClick(){
    var qtty = 0;
    if(this.qtty){
      qtty = parseInt(this.qtty)+1;
      this.qtty = qtty.toString();
    }else{
      qtty = 0+1;
      this.qtty = qtty.toString();
    }
  }  
  minusBtnClick(){
    var qtty = 0;
    if(this.qtty && parseInt(this.qtty) > 0 ){
      qtty = parseInt(this.qtty)-1;
      this.qtty = qtty.toString();
    }
  }

}