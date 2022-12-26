import { AfterContentChecked, Component, ViewChild,OnInit,ViewEncapsulation } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { PreloadAllModules, RouterModule, Router } from '@angular/router';
import { SwiperComponent } from "swiper/angular";
import { CategoriesServicesPage } from '../dataServices/categories-services/categories-services.page';
import { Storage } from '@ionic/storage';
import {ProductsServicesPage} from 'src/app/dataServices/products-services/products-services.page';
import SwiperCore, { SwiperOptions,Pagination, Swiper,EffectFade,Autoplay,Navigation } from 'swiper';

SwiperCore.use([Autoplay, Pagination, Navigation]);
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation : ViewEncapsulation.None
})
export class HomePage implements AfterContentChecked {
  @ViewChild('swiper') SwiperCore: SwiperComponent;
  config : SwiperOptions = {
    slidesPerView : 1,
    pagination : true,
    autoplay:{
      delay: 300
    },
    spaceBetween : 50,
    
  }
  slideConfig = {"slidesToShow": 2, "slidesToScroll":1,"autoplay" :true };
  slideOpts1 = {
    initialSlide: 1,
    speed: 400,
    loop: true,
  };
   slideOpts =  {
    loop : true,
    initialSlide: 0,
    autoplay : true,
    speed: 2000,
  };
  offlineStatus = false;
   productHomePage :any =[];
   categoriesList;
   productsCtaegories : any =[];
  constructor(private CategoriesServicesPage : CategoriesServicesPage,private router : Router, public storage: Storage, private ProductsServicesPage : ProductsServicesPage) { }
  ngAfterContentChecked() {
    
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter')
  }
  ngOnInit() {
    this.loadHomeProducts();
    this.CategoriesServicesPage.getAllCategories().subscribe(res=>{
      this.categoriesList = res.categories;
      Object.entries(this.categoriesList).forEach( (item) =>{
        let fake_item :any;
        fake_item = item[1];
        console.log(fake_item.id)
        this.CategoriesServicesPage.getCategory(fake_item.id,1,null).subscribe(res=>{
          console.log(res)
          this.productsCtaegories[fake_item.id] = res;          
        })
      });
      
    })
    console.log('productHomePage : ',this.productHomePage)
    if(!window.navigator.onLine){
      this.offlineStatus = true;
    }
  }
  clicktest(id,pageNbr){
    this.setStorageValue('currentCategoryId',id);
    this.router.navigateByUrl(`/categorie/${id}/${pageNbr}`);
  }
  loadHomeProducts(){
    this.ProductsServicesPage.getAllProducts().subscribe(result  => {
      Object.entries(result).forEach( (item) =>{
        let fake_item = JSON.parse(JSON.stringify(item[1]));
        if(fake_item.specific_prices.reduction_type == "amount"){
          fake_item.reduction = parseFloat(fake_item.specific_prices.reduction).toFixed(3)
          fake_item.reduction = fake_item.reduction.toString() + "TND";
        }else{
          fake_item.reduction = parseFloat(fake_item.specific_prices.reduction)*100;
          fake_item.reduction = fake_item.reduction.toString() + "%";
        } //const result1 = num1.toFixed(2)
        let src = fake_item.id_image;
        fake_item.imgSrc = src.replace("-", "/");
        fake_item.imgSrc = "https://stebouhaha.com/api/images/products/"+fake_item.imgSrc+"?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9"
        console.log(fake_item)
          this.productHomePage.push(fake_item);
      });
      })
      console.log(this.productHomePage)
  }
  
  async setStorageValue(key: string, value: any): Promise<any> {
    try {
    const result = await this.storage.set(key, value);
    return true;
    } catch (reason) {
    console.log(reason);
    return false;
    }
  }
  renderProduct(id){
    this.router.navigateByUrl(`/product/${id}`);
  }
  SearchFunction(e){
    //console.log(e)
    this.router.navigateByUrl(`/search/${e}`);
  }
}
