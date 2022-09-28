import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {MarquesServicesPage} from 'src/app/dataServices/marques-services/marques-services.page';
import { Storage } from '@ionic/storage';
import {CategoriesServicesPage} from 'src/app/dataServices/categories-services/categories-services.page';

@Component({
  selector: 'app-productmarque',
  templateUrl: './productmarque.page.html',
  styleUrls: ['./productmarque.page.scss'],
})
export class ProductmarquePage implements OnInit {
 
  constructor(private loadingCtrl: LoadingController,
    private router : Router, 
    private route : ActivatedRoute,
    private MarquesServicesPage : MarquesServicesPage,
    private CategoriesServicesPage :CategoriesServicesPage,
    public storage: Storage) {
    
  }
  qtty : string;
   productData;
  marque_id = this.route.snapshot.paramMap.get('id');
  productImgSrc;
  pageNbr = 1;
  public currentPage = 0;
  public currentProducts :  any;
  paginationArray = [];
  manufacturer_name : string = this.route.snapshot.paramMap.get('id');
  customerId;

  async ngOnInit() {
    await this.storage.create();
    this.loadProductItems();
  }

  async loadProductItems(){
    this.getStorageValue('customeContext').then(result => {
      console.log('result:',result) ;
      if(result !=null){
        this.customerId = result.id;
      }else{
        this.customerId = null;
      }
    });
    const loading = await this.loadingCtrl.create({
      message : 'loading..',
      spinner : 'bubbles'
    });
    await loading.present();
    this.MarquesServicesPage.getProductsMarque(this.marque_id,this.customerId).subscribe((res)=>{
      loading.dismiss();
      this.currentProducts= res;
      this.pageNbr = Math.floor(this.currentProducts.length / 12);
      for (let index = 1; index < this.pageNbr; ++index) {
        this.paginationArray.push(index); 
      }
      Object.entries(this.currentProducts).forEach((item)=>{
        let fakeItem : any = {};
        fakeItem = item[1];
        fakeItem.formatedPrice = parseFloat(fakeItem.price_tax_exc).toFixed(3).toString()+'TND';
        console.log('fakeItem.formatedPrice',fakeItem.formatedPrice)
        console.log(fakeItem);
        if(fakeItem.images ){
          fakeItem.imgSrc = fakeItem.images[0].medium.url;
        }else{
          fakeItem.imgSrc = '../../assets/holder.jpg';
        }
        item[1] = fakeItem;
      })
      
    });
    
  }

  renderProduct(id){
    console.log('supposed to be product id: ',id)
    this.router.navigateByUrl(`/product/${id}`);
  }

  paginationClick(id){
    console.log(id)
    this.currentProducts = this.productData[id-1];
    console.log(this.currentProducts)
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
