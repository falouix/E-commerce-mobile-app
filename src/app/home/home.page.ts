import { Component, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {ProductsServicesPage} from 'src/app/dataServices/products-services/products-services.page';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   productHomePage = new Array();
   productHomePage1 = new Array();
   productHomePage2 = new Array();
   productHomePage3 = new Array();
  constructor(private router : Router, public storage: Storage, private ProductsServicesPage : ProductsServicesPage) { }

  ngOnInit() {
    this.loadHomeProducts();
  }
  clicktest(id,pageNbr){
 
    this.setStorageValue('currentCategoryId',id);
    this.router.navigateByUrl(`/categorie/${id}/${pageNbr}`);
  }
  loadHomeProducts(){
    this.ProductsServicesPage.getAllProducts().subscribe(result  => {
      console.log('result promo : ',result)
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
        src.replace("-", "/");
        
        fake_item.imgSrc = src.replace("-", "/");
        fake_item.imgSrc = "https://stebouhaha.com/api/images/products/"+fake_item.imgSrc+"?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9"
        
        console.log(src.replace("-", "/"))
        this.productHomePage.push(fake_item);
      });
      })
      console.log('typeof : ',this.productHomePage)
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
}
