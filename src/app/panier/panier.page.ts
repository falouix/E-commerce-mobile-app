import { Component, OnInit,OnDestroy, ViewChild, ElementRef, Renderer2   } from '@angular/core';
import { Storage } from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductsServicesPage} from 'src/app/dataServices/products-services/products-services.page';
import { ToastController } from '@ionic/angular';
import {Router,ActivatedRoute} from '@angular/router';

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

  
  constructor(  private router : Router,  private toastController: ToastController,public storage: Storage,private ProductsServicesPage : ProductsServicesPage,private http:HttpClient) { }


  
async presentToast(position: 'top' | 'middle' | 'bottom') {
  const toast = await this.toastController.create({
    message: 'Produit supprimé',
    duration: 1500,
    position: position
  });

  await toast.present();
}
  async ngOnInit() {
    await this.storage.create();
    this.loadCurentPanier();
  }

  ionViewWillEnter() {
    this.loadCurentPanier();
  }

  ionViewDidEnter() {
    this.loadCurentPanier();
  }

  ionViewWillLeave (){
    this.loadCurentPanier();
  }

  ngOnDestroy() {
    this.loadCurentPanier();
  }
  //all about local storage [set and get for the moment]
  async loadCurentPanier(){
    this.contextclonevar = await this.getStorageValue('contextCloneOrsomethng').then(result => {
      console.log('result',result)
      return (result);
      }).catch(e => {
        console.log('error: '+ e);
      });
      if(this.contextclonevar != null ){
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
      
      this.totalCart = this.contextclonevar.cart.totals.total.value;
      this.productCount = this.contextclonevar.cart.products_count;
    }
    
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


 async  deletFrombasket(id){
let cart_products =this.contextclonevar.cart.products;
let catID = this.contextclonevar.contextCart.id ;
var del_index = '';
  cart_products.forEach( (element, index) => {
    if (element.id == id){
     del_index = index;
    }
   });
   this.ProductsServicesPage.deletProductCart(id,this.contextclonevar.contextCart.id).subscribe(async (res) =>{
    this.setStorageValue('contextCloneOrsomethng',res);
    if(res.success ){
      this.presentToast('middle');
     }
    });
     delete this.contextclonevar.cart.products[del_index];
      document.getElementById("prod_"+id).innerHTML = "";
      document.getElementById("prod_"+id).outerHTML = "";
      document.getElementById("prod_"+id).remove();
 }

}
