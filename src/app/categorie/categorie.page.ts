import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {CategoriesServicesPage} from 'src/app/dataServices/categories-services/categories-services.page';
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {
  constructor(private loadingCtrl: LoadingController,private router : Router, private route : ActivatedRoute,private CategoriesServices : CategoriesServicesPage) { }
     currentCategoryLogo : string;
     currenrCategroryTitle : string;
     currentCategory=[];
     subCategory;
     category_id = this.route.snapshot.paramMap.get('id');
     currentPage = this.route.snapshot.paramMap.get('pageNbr');
     categoryPagination=[];
     categoryPages=[];
     categoryProducts=[];
     categoryProductsSort=[];   
 
  ngOnInit() {
    this.loadCategoryItems();
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
      this.CategoriesServices.getCategory(this.category_id,this.currentPage).subscribe(res =>{
       //let x = res.data.label.split(" ");
        loading.dismiss();
        console.log('res.data.products',res.data.products)
        this.currenrCategroryTitle = res.data.label.split(" ")[2];
        this.currentCategoryLogo="../../assets/imgs/categories-icons/"+res.data.label.split(" ")[2].toLowerCase()+".png";
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

}
