import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ProductsServicesPage } from '../dataServices/products-services/products-services.page';
@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.page.html',
  styleUrls: ['./delivery-list.page.scss'],
})
export class DeliveryListPage implements OnInit {

  constructor(private route : ActivatedRoute,private ProductsServicesPage : ProductsServicesPage) { }
  category_id = this.route.snapshot.paramMap.get('id_delivery');
  ngOnInit() {
    this.loadDeliveryList();
  }
  loadDeliveryList(){
   this.ProductsServicesPage.getDeliveryAdrs(28,23).subscribe(res=>{
    console.log('res',res)
   })
  }
}
