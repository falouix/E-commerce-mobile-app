import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { SearchServicesPage } from 'src/app/dataServices/search-services/search-services.page';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  constructor(private SearchServicesPage : SearchServicesPage,private router : Router,
    private route : ActivatedRoute) { }
   public searchResult
  searchTerm = this.route.snapshot.paramMap.get('s');
  ngOnInit() {
    this.loadSearchData()
  }
  loadSearchData(){
    this.SearchServicesPage.getSearchResult(this.searchTerm).subscribe((res)=>{
      console.log('res search : ',res);
      this.searchResult = res;
      Object.entries(this.searchResult).forEach( (item) =>{
          let fakeItem :any = {};
          fakeItem = item[1];
          fakeItem.formatedPrice = parseFloat(fakeItem.price_tax_exc).toFixed(3).toString()+' TND';
        if(fakeItem.images ){
          fakeItem.imgSrc = fakeItem.images[0].medium.url;
        }else{
          fakeItem.imgSrc = '../../assets/holder.jpg';
        }
        item[1] = fakeItem
      });
    })
  }
  renderProduct(id){
    this.router.navigateByUrl(`/product/${id}`);
  }
}
