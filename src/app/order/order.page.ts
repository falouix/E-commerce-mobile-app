import { Component, OnInit,OnDestroy, ViewChild, ElementRef, Renderer2   } from '@angular/core';
import { Storage } from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {ProfilePage} from 'src/app/profile/profile.page';
import {ProductsServicesPage} from 'src/app/dataServices/products-services/products-services.page';
import { ToastController } from '@ionic/angular';
import {Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  contextclonevar;
  panierProducts;
  totalCart;
  addresse;
  productCount;
  currentUserinfo ;
  firstname ;
  lastname ;
  adresseslist;
  selectedID;
  constructor( 
    private router : Router, 
     private toastController: ToastController,
     public storage: Storage,
     private ProductsServicesPage : ProductsServicesPage,
     private http:HttpClient) { }

  /*async ngOnInit() {
    console.log('this function just loaded')
    await this.storage.create();
    this.loadCurentPanier();
  }
  OnDestroy(){
    console.log('this function just ended')
    this.loadCurentPanier();
  }
  ionViewWillEnter() {
    this.loadCurentPanier();
  }
  ionViewDidLeave() {
    this.loadCurentPanier();
  }*/

  
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

      
    this.currentUserinfo = await   this.getStorageValue('customeContext').then(result => {
     // console.log('customeContext' , result);
return result;

}).catch(e => {
      console.log('error: '+ e);
    }); 

    this.firstname = this.currentUserinfo.firstname;
    this.lastname = this.currentUserinfo.lastname;
    console.log(this.firstname, this.lastname );

    this.ProductsServicesPage.getadressesCart(this.currentUserinfo.id).subscribe(res =>{
      this.adresseslist = res.addresses;
      console.log('this.adresseslist', this.adresseslist);
   
    });
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

  ionViewDidLeave() {
    this.loadCurentPanier();
  }

  ngOnDestroy() {
    this.loadCurentPanier();
  }
  //all about local storage [set and get for the moment]
  async loadCurentPanier(){
    this.contextclonevar = await this.getStorageValue('contextCloneOrsomethng').then(result => {
      //console.log('result',result)
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
    console.log('111',this.addresse);
    this.router.navigateByUrl(`delivery-list/${this.addresse}`);
 
    
    
    
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

single_adress:any = {}


    addadress() {
    
     let  data ='back=&token=5aa0980905de7fd1ff75aa90261d9800&alias='+this.single_adress['alias']+'&firstname='+this.firstname+'&lastname='+this.firstname+'&company=&vat_number=&address1='+this.single_adress['address1']+'&address2=&postcode='+this.single_adress['postcode']+'&city='+this.single_adress['city']+'&id_country=208&phone='+this.single_adress['phone']+'&submitAddress=1';

let id_user = this.currentUserinfo.id;
      this.ProductsServicesPage.addadresseCart(id_user,data).subscribe(async (res) =>{
        if(res.success ){
          this.ProductsServicesPage.getadressesCart(this.currentUserinfo.id).subscribe(res =>{
            this.adresseslist = res.addresses;
          });
         }
        });
  }

  deletAddress(id){
   
    let id_user = this.currentUserinfo.id;
    this.ProductsServicesPage.deletadresse(id,id_user).subscribe(res =>{
      if(res.success ){
        this.ProductsServicesPage.getadressesCart(this.currentUserinfo.id).subscribe(res =>{
          this.adresseslist = res.addresses;
        });
      }
    });
  }

}
