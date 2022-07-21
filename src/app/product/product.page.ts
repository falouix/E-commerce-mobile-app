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
  constructor(private loadingCtrl: LoadingController,private router : Router, private route : ActivatedRoute,private ProductsServicesPage : ProductsServicesPage) { }
  
  productData;
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
      console.log("res : ",this.productData)
    });
  }
  clicktest(id,pageNbr){
    this.router.navigateByUrl(`/categorie/${id}/${pageNbr}`);
  }

}
