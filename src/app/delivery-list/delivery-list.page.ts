import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ProductsServicesPage } from '../dataServices/products-services/products-services.page';
@Component({ 
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.page.html',
  styleUrls: ['./delivery-list.page.scss'],
})
export class DeliveryListPage implements OnInit {
  selectedDelivery;
  constructor(private router:Router,private route : ActivatedRoute,private ProductsServicesPage : ProductsServicesPage) { }
  category_id = this.route.snapshot.paramMap.get('id_delivery');
  deliveryList : any = [];
  ngOnInit() {
    this.loadDeliveryList();
  }
  loadDeliveryList(){
   this.ProductsServicesPage.getDeliveryAdrs(28,23).subscribe(res=>{
    console.log('res',res)
    let fakeItem: any = [];

    Object.entries(res).forEach(item => {
      console.log('list',item);
      fakeItem = item;
      this.deliveryList.push(fakeItem[1])
    });
     
    console.log(this.deliveryList);
   })
  }
  checkout(id){
    this.router.navigateByUrl(`/payment/${this.selectedDelivery}`);
  }
}
