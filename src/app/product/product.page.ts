import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer }  from '@angular/platform-browser';
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
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private router : Router, 
    private route : ActivatedRoute,
    private ProductsServicesPage : ProductsServicesPage,
    public storage: Storage
    ) {
    
   }
   handlerMessage = '';
  roleMessage = '';
// alert message when quantity is empty (later to use)
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
  productName;
  productReference;
  productDescription_short;
  productPrice;
  product_id = this.route.snapshot.paramMap.get('id');
  productImgSrc;
  contextclonevar;
  async ngOnInit() {
    await this.storage.create();
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
      console.log('this.productData.product.associations.images[0].length',this.productData.product)
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
      console.log('this.productData',this.productData1);
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
  checkContext(){
    this.ProductsServicesPage.checkApptoken().subscribe(res =>{
      return(res.variablesApp.static_token);
    });
  }
  async addTobasket(id){
    let token = this.checkContext();
    console.log('this the quantity : ',this.qtty)
    if(! this.qtty || this.qtty == '0'){
      this.presentAlert();
      return;
    }else{
    this.contextclonevar = await this.getStorageValue('contextCloneOrsomethng').then(result => {
      return (result);
      }).catch(e => {
        console.log('error: '+ e);
      });
      if(this.contextclonevar !== null){
           //get current context cart 
           this.contextclonevar = await this.getStorageValue('contextCloneOrsomethng').then(result => {
            return (result);
            }).catch(e => {
              console.log('error: '+ e);
            });
        this.ProductsServicesPage.addProductToCart(id,parseInt(this.qtty),'exist',token,this.contextclonevar.contextCart.id).subscribe(async (res) =>{
        console.log('the real result : ', res);
        this.setStorageValue('contextCloneOrsomethng',res);
        });
      }else{
        
        this.ProductsServicesPage.addProductToCart(id,parseInt(this.qtty),'notexist',token,0).subscribe(async (res) =>{
          console.log('the real result : ', res);
          this.setStorageValue('contextCloneOrsomethng',res);
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
