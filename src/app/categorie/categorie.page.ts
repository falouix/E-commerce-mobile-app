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
     currentCategory=[];
     category_id = this.route.snapshot.paramMap.get('id');
     categoryPagination=[];
     categoryPages=[];
     categoryProducts=[];
     categoryProductsSort=[];   
     currentPage = this.route.snapshot.paramMap.get('pageNbr');
  constructor(private loadingCtrl: LoadingController,private router : Router, private route : ActivatedRoute,private CategoriesServices : CategoriesServicesPage) { }
  
  ngOnInit() {
    this.loadCategoryItems();
  }
    async loadCategoryItems(){
      const loading = await this.loadingCtrl.create({
        message : 'loading..',
        spinner : 'bubbles'
      });
      await loading.present();
      this.CategoriesServices.getCategory(this.category_id,this.currentPage).subscribe(res =>{
        loading.dismiss();
        this.currentCategory = res.category;
        this.categoryPagination = res.data.pagination;
        this.categoryProducts = res.data.products;
        this.categoryProductsSort = res.data.products;
        console.log("pages at first",this.categoryPages);
        this.categoryPages.length = 0;
        Object.entries(res.data.pagination.pages).forEach( (value) =>{
          this.categoryPages.push(value[1]);
        });
        console.log('this.categoryProducts',this.categoryProducts);
        console.log("pages",this.categoryPages);
      });
    }
    clicktest(id,pageNbr){
      this.router.navigateByUrl(`/categorie/${id}/${pageNbr}`);
    }

}
