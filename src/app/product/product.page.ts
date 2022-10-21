import { Component, OnInit } from '@angular/core';

import { SafeResourceUrl, DomSanitizer }  from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import {Router,ActivatedRoute} from '@angular/router';

import { LoadingController,AlertController  } from '@ionic/angular';
import {ProductsServicesPage} from 'src/app/dataServices/products-services/products-services.page';

import { Storage } from '@ionic/storage';

@Component({ 
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private router : Router, 
    private route : ActivatedRoute,
    private ProductsServicesPage : ProductsServicesPage,
    public storage: Storage
    ) {
    this.qtty = '1';
   }
   handlerMessage = '';
  roleMessage = '';
// alert message when quantity is empty (later to use)

async presentToast(position: 'top' | 'middle' | 'bottom') {
  const toast = await this.toastController.create({
    message: 'Produit ajouté au panier',
    duration: 1500,
    position: position
  });

  await toast.present();
}
async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Quantité est vide!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          this.handlerMessage = 'Alert canceled';
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.handlerMessage = 'Alert confirmed';
        },
      },
    ],
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  this.roleMessage = `Dismissed with role: ${role}`;
}

  qtty : string;
  public productData;
  public productData1;
  profileData;
  productName;
  productReference;
  productDescription_short;
  productPrice;
  product_id = this.route.snapshot.paramMap.get('id');
  productImgSrc;
  contextclonevar;
  async ngOnInit() {
    await this.storage.create();
    this.profileData = await this.getStorageValue('customeContext').then(result => {
      if(result == null){
       console.log('you should connect to your account for better experience')
      }else{
       return result;
      }
     }).catch(e => {
       console.log('error: '+ e);
     });
     console.log('profileData',this.profileData);
    this.loadProductItems();
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
   if(this.productData.product.associations.images){
          this.productImgSrc = 'https://stebouhaha.com/api/images/products/'+
          this.productData.product.id+
          '/'+
          this.productData.product.associations.images[0].id+
          '?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON';
      }else{
        this.productImgSrc ="../../assets/imgs/main_logo.png";
      }
      this.productData1 = this.productData.product;
      this.productName = this.productData1.name;
      this.productReference = this.productData1.reference;
      this.productDescription_short = this.productData1.description_short.replace(/<[^>]+>/gm, '');//this._sanitizer.bypassSecurityTrustHtml(this.productData1.description_short);
      this.productPrice = this.productData1.price;
    }, (err) => {
      console.log('lose ' + JSON.stringify(err));});
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
  checkContext(){
    this.ProductsServicesPage.checkApptoken().subscribe(res =>{
      return(res);
    });
  }
  async addTobasket(id){
    console.log('user clicked add');
    let token = '';
    if(! this.qtty || this.qtty == '0'){
      this.presentAlert();
      return;
    }else{
      console.log('everything okay and we want t get contextCloneOrsomethng');
    this.contextclonevar = await this.getStorageValue('contextCloneOrsomethng').then(result => {
      return (result);
      }).catch(e => {
        console.log('error: '+ e);
      });
      if(this.contextclonevar !== null){
           //get current context cart 
           console.log('contextCloneOrsomethng is not null:' ,this.contextclonevar);
        this.contextclonevar = await this.getStorageValue('contextCloneOrsomethng').then(result => {
         return (result);
         }).catch(e => {
           console.log('error: '+ e);
         });
        this.ProductsServicesPage.addProductToCart(id,parseInt(this.qtty),'exist',this.contextclonevar.contextCart.id,this.contextclonevar.cart.products,this.profileData.id).subscribe(async (res) =>{
        this.setStorageValue('contextCloneOrsomethng',res);
        if(res.success ){
          this.presentToast('middle');
          this.router.navigateByUrl(`panier`);
         }
        });
      }else{
        
        console.log('contextCloneOrsomethng is null');
        this.ProductsServicesPage.addProductToCart(id,parseInt(this.qtty),'notexist',0,0,this.profileData.id).subscribe(async (res) =>{
          this.setStorageValue('contextCloneOrsomethng',res);
          if(res.success ){
            this.presentToast('middle')
            this.router.navigateByUrl(`panier`);
           }
        });
      }
    }
  }
    //all about local storage [set and get for the moment]
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
