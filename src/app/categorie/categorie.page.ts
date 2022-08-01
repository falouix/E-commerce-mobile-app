import { Component, Injectable,OnInit } from '@angular/core';
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
     currenrCategroryTitle : string;
     currentCategory=[];
     subCategory;
     category_id = this.route.snapshot.paramMap.get('id');
     currentPage = this.route.snapshot.paramMap.get('pageNbr');
     categoryPagination=[];
     categoryPages=[];
     categoryProducts=[];
     categoryProductsSort=[];   
 
     async ngOnInit() {
    
    await this.storage.create();
    this.loadCategoryItems();
    console.log("currentCategoryLogo11111",this.currentSubCategoryLogo)
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
        console.log('res.data.products',res.data)
        this.currenrCategroryTitle = res.data.label.split(" ")[2];
        if(this.subCategory){
          this.currentCategoryLogo="../../assets/imgs/categories-icons/"+res.data.label.split(" ")[2].toLowerCase()+".png";
          }
        this.currentCategory = res.category;
        this.categoryPagination = res.data.pagination;
        this.categoryProducts = res.data.products;
        this.categoryProductsSort = res.data.products;
        this.categoryPages.length = 0;
        Object.entries(res.data.pagination.pages).forEach( (value) =>{
          this.categoryPages.push(value[1]);
        });
      });
    }
    clicktest(id,pageNbr){
      this.router.navigateByUrl(`/categorie/${id}/${pageNbr}`);
    }
    renderProduct(id){
      this.router.navigateByUrl(`/product/${id}`);
    }
    renderSubCategory(id,currentCategoryLogo){
      this.currentSubCategoryLogo = currentCategoryLogo;
      this.setcurrentCategoryLogo('test',currentCategoryLogo);
      console.log("currentCategoryLogo",this.currentSubCategoryLogo)
      this.router.navigateByUrl(`/categorie/${id}/1`);
    }


    async setcurrentCategoryLogo(key: string, value: any): Promise<any> {
      try {
      const result = await this.storage.set(key, value);
      console.log('set string in storage: ' + result);
      return true;
      } catch (reason) {
      console.log(reason);
      return false;
      }
    }
}
