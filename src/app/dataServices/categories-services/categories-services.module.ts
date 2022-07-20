import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesServicesPageRoutingModule } from './categories-services-routing.module';

import { CategoriesServicesPage } from './categories-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesServicesPageRoutingModule
  ],
  declarations: [CategoriesServicesPage]
})
export class CategoriesServicesPageModule {}
