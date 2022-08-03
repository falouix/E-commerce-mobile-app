import { Component,Injectable,OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {CategoriesServicesPage} from 'src/app/dataServices/categories-services/categories-services.page';
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
    private loadingCtrl: LoadingController,
    private router : Router, 
    private route : ActivatedRoute,
    private CategoriesServices : CategoriesServicesPage,
    public storage: Storage
    ) { }
    
     currentCategoryLogo : string;
     currentSubCategoryLogo : string;
     currenrCategroryTitle: string;
     currenrSubCategroryTitle : string;
     currentCategory=[];
     subCategory;
     currentCategoryId;
     category_id = this.route.snapshot.paramMap.get('id');
     currentPage = this.route.snapshot.paramMap.get('pageNbr');
     categoryPagination=[];
     categoryPages=[];
     categoryProducts=[];
     categoryProductsSort=[];   
    async ngOnInit() {
      await this.storage.create();
      this.loadCategoryItems();
      if(this.currentSubCategoryLogo == undefined){
        //get current category logo
        this.getStorageValue('currentSubCategoryLogo').then(result => {
          if (result != null) {
            console.log('this.currentSubCategoryLogo : '+ result);
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
            console.log('this.currenrCategroryTitle : '+ this.currenrCategroryTitle);
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
        console.log('subCategory',this.subCategory);
      });
      this.CategoriesServices.getCategory(this.category_id,this.currentPage).subscribe(res =>{
       //let x = res.data.label.split(" ");
        loading.dismiss();
        console.log('res.data.products',res)
        if(this.subCategory){
          this.currenrCategroryTitle = res.data.label.split(" ")[2];
          this.currentCategoryLogo="../../assets/imgs/categories-icons/"+res.data.label.split(" ")[2].toLowerCase()+".png";
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
          console.log( item[1].images.length);
          if(item[1].images.length >0 ){
            item[1].imgSrc = item[1].images[0].medium.url;
          }else{
            item[1].imgSrc = '../../assets/holder.jpg';
          }
        });
      });
    }

    clicktest(id,pageNbr){
      this.router.navigateByUrl(`/categorie/${id}/${pageNbr}`);
    }

    backToparentCategory(id = null,pageNbr = 1){
      if(id != null){
        this.router.navigateByUrl(`/categorie/${id}/${pageNbr}`);
      }else{
        console.log('clicked')
      }
    }
    renderProduct(id){
      this.router.navigateByUrl(`/product/${id}`);
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
      console.log('set string in storage:' + result);
      return true;
      } catch (reason) {
      console.log(reason);
      return false;
      }
    }

    async getStorageValue(key: string): Promise<any> {
      try {
      const result = await this.storage.get(key);
      console.log('set string in storage: ' + result);
      return result;
      } catch (reason) {
      console.log(reason);
      return false;
      }
    }
}
