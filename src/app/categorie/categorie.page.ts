import { Component,Injectable,OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {CategoriesServicesPage} from 'src/app/dataServices/categories-services/categories-services.page';
import {ProductsServicesPage} from 'src/app/dataServices/products-services/products-services.page';
import { AppComponent } from '../app.component';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
@Injectable({
  providedIn : 'root',
})
export class CategoriePage implements OnInit {
  constructor( 
    public ProductsServicesPage :ProductsServicesPage ,
    private loadingCtrl: LoadingController,
    private router : Router, 
    private route : ActivatedRoute,
    private CategoriesServices : CategoriesServicesPage,
    public storage: Storage,
    public AppComponent :AppComponent
    ) { }
    customerData;
     currentCategoryLogo : string;
     currentSubCategoryLogo : string;
     currenrCategroryTitle: string;
     currenrSubCategroryTitle : string;
     currentCategory=[];
     subCategory;
     subCategoryTorender : any=[];
     currentCategoryId;
     category_id = this.route.snapshot.paramMap.get('id');
     currentPage = this.route.snapshot.paramMap.get('pageNbr');
     categoryPagination=[];
     categoryPages=[];
     categoryProducts=[];
     categoryProductsSort=[];
     
     
     ionViewDidEnter() {
      this.AppComponent.turnoff()
    }
  
    async ngOnInit() {
      await this.storage.create();
      this.AppComponent.turnoff()
      this.loadCategoryItems();
      if(this.currentSubCategoryLogo == undefined){
        //get current category logo
        this.getStorageValue('currentSubCategoryLogo').then(result => {
          if (result != null) {
            this.currentSubCategoryLogo = result;
          }
          }).catch(e => {
            console.log('error: '+ e);
          });
          //get current category title
          this.getStorageValue('currenrCategroryTitle').then(result => {
            if (result != null) {
              this.currenrCategroryTitle = result;
            }
            }).catch(e => {
              console.log('error: '+ e);
            });
          //get current category title
          this.getStorageValue('currentCategoryId').then(result => {
            if (result != null) {
              this.currentCategoryId = result;
            }
            }).catch(e => {
              console.log('error: '+ e);
            });
      }
    }
    async loadCategoryItems(){
      const loading = await this.loadingCtrl.create({
        message : 'loading..',
        spinner : 'bubbles'
      });
      await loading.present();
      this.CategoriesServices.getsubCategory(this.category_id).subscribe(res =>{
        this.subCategory = res.categories;
      });
      //get current category title
      this.getStorageValue('customeContext').then(result => {
        console.log('result:',result) ;
        
        let customerId;
        if(result !=null){
          customerId = result.id;
        }else{
          customerId = null;
        }
          this.customerData = result;
      this.CategoriesServices.getCategory(this.route.snapshot.paramMap.get('id'),this.currentPage,customerId).subscribe(res =>{
          
        console.log("******* res at first *******");
        console.log( res );
        loading.dismiss();
        if(this.subCategory){
          this.subCategory.forEach( (value) =>{
                value.imgSrc = "https://stebouhaha.com/c/"+value.id+"-small_default/"+value.name+".jpg";
                  var request = new XMLHttpRequest();
                  request.open("GET", value.imgSrc, true);
                  request.send();
                  request.onload = function() {
                    if (request.status == 200)
                    {
                    } else {
                      value.imgSrc ="../../assets/imgs/main_logo.png"
                    }
                  }
          });
          this.currenrCategroryTitle = res.data.label.split(" ")[2];
          this.currentCategoryLogo="../../assets/imgs/categories-icons/"+res.data.label.split(" ")[2].toLowerCase()+".png";
           
           for (let index = 0; index < this.subCategory.length/3; index++) {
            this.subCategoryTorender.push( this.subCategory.slice(index * 3,(index+1) * 3));
           }
           console.log("this.subCategoryTorender we should work with",this.subCategoryTorender);
        }else{
          this.currenrSubCategroryTitle = res.data.label.split(" ")[2];
        }
        this.currentCategory = res.category;
        this.categoryPagination = res.data.pagination;
        this.categoryProducts = res.data.products;
        this.categoryProductsSort = res.data.products;
        this.categoryPages.length = 0;
        Object.entries(res.data.pagination.pages).forEach( (value,key) =>{
          this.categoryPages.push(value);
        });
        Object.entries(this.categoryProducts).forEach( (item) =>{
          
          if(item[1].images.length >0 ){
            item[1].imgSrc = item[1].images[0].medium.url;
          }else{
            item[1].imgSrc = '../../assets/holder.jpg';
          }
        });
      });
  }).catch(e => {
    console.log('error: '+ e);
  });
    }

    clicktest(id,pageNbr){
      this.router.navigateByUrl(`/categorie/${id}/${pageNbr}`);
    }

    backToparentCategory(id = null,pageNbr = 1){
      if(id != null){
        this.router.navigateByUrl(`/categorie/${id}/${pageNbr}`);
      }else{
      }
    }
    renderProduct(id){
      this.router.navigateByUrl(`/product/${id}`);
    }
    SearchFunction(e){
      console.log(e)
      this.router.navigateByUrl(`/search/${e}`);
    }
    //Render sub category products and set some vars
    renderSubCategory(id,currentCategoryLogo,currenrCategroryTitle,currentCategoryId){
      this.setStorageValue('currentSubCategoryLogo',currentCategoryLogo);
      this.setStorageValue('currenrCategroryTitle',currenrCategroryTitle);
      this.setStorageValue('currentCategoryId',currentCategoryId);
      this.router.navigateByUrl(`/categorie/${id}/1`);
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
    doSomething(url){
      
    }
}
