import { Component, OnInit,OnDestroy  } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ProductsServicesPage} from 'src/app/dataServices/products-services/products-services.page';
@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
  contextclonevar;
  panierProducts;
  totalCart;
  productCount;
  constructor(public storage: Storage,private ProductsServicesPage : ProductsServicesPage) { }

  async ngOnInit() {
    console.log('this function just loaded')
    await this.storage.create();
    this.loadCurentPanier();
  }
  OnDestroy(){
    console.log('this function just ended')
    this.loadCurentPanier();
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter - Page 1');
    this.loadCurentPanier();
  }
  ionViewDidLeave() {
    this.loadCurentPanier();
  }
  //all about local storage [set and get for the moment]
  async loadCurentPanier(){
    this.contextclonevar = await this.getStorageValue('contextCloneOrsomethng').then(result => {
      
      return (result);
      }).catch(e => {
        console.log('error: '+ e);
      });
      this.panierProducts = this.contextclonevar.cart.products;
      this.panierProducts.forEach(item =>{
        item.imgSrc  = this.getProductImg(item.id);
        this.ProductsServicesPage.getProduct(item.id).subscribe(res =>{
          let productData = res;
          if(productData.product.associations.images){
            item.imgSrc= 'https://stebouhaha.com/api/images/products/'+
              productData.product.id+
              '/'+
              productData.product.associations.images[0].id+
              '?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON';
          }else{
            item.imgSrc =  "../../assets/imgs/main_logo.png";
          }
        });
      })
      console.log('this.contextclonevar at the start of loading : ',this.contextclonevar.cart);
      this.totalCart = this.contextclonevar.cart.totals.total.value;
      this.productCount = this.contextclonevar.cart.products_count;
  }
  checkout(){
    console.log('checkout function')
  }
  //function just to set images for products 
  getProductImg(id){
    this.ProductsServicesPage.getProduct(id).subscribe(res =>{
      let productData = res;
      if(productData.product.associations.images){
           return 'https://stebouhaha.com/api/images/products/'+
          productData.product.id+
          '/'+
          productData.product.associations.images[0].id+
          '?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON';
      }else{
        return "../../assets/imgs/main_logo.png";
      }
    });
  }
  async setStorageValue(key: string, value: any): Promise<any> {
    try {
    const result = await this.storage.set(key, value);
    return true;
    } catch (reason) {
    return false;
    }
  }
  async getStorageValue(key: string): Promise<any> {
    try {
    const result = await this.storage.get(key);
    return result;
    } catch (reason) {
    return false;
    }
  }

}
