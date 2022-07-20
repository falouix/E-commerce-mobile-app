import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsServicesPageRoutingModule } from './products-services-routing.module';

import { ProductsServicesPage } from './products-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsServicesPageRoutingModule
  ],
  declarations: [ProductsServicesPage]
})
export class ProductsServicesPageModule {}
