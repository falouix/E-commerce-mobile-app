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
      
      Object.entries(result.products).forEach( (item,key) =>{
        
        if(item[1]){
          this.productHomePage.push(item[1])
        }
        this.productHomePage[key].priceFormated = parseFloat(this.productHomePage[key].price).toFixed(3).toString() + ' TND';
        if(this.productHomePage[key].associations.images != undefined ){
          
          //console.log('Math.round(num * 100) : ',this.productHomePage[key].price.toFixed(2));
          this.productHomePage[key].imgSrc = 'https://stebouhaha.com/api/images/products/'+
          this.productHomePage[key].id+
          '/'+
          this.productHomePage[key].associations.images[0].id+
          '?ws_key=4JSQRSQJ5DNCP3A1KY1LK8XC42AR1AD9&output_format=JSON';
        
        }else{
          this.productHomePage[key].imgSrc ="../../assets/imgs/main_logo.png";
        }
      });
      this.productHomePage1 = this.productHomePage.slice(0,2);
      this.productHomePage2 = this.productHomePage.slice(2,4);
      this.productHomePage3 = this.productHomePage.slice(4,6);
      console.log('this.productHomePage3 : ',this.productHomePage3)
      return (this.productHomePage);
      })
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
