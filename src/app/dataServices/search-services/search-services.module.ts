import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchServicesPageRoutingModule } from './search-services-routing.module';

import { SearchServicesPage } from './search-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchServicesPageRoutingModule
  ],
  declarations: [SearchServicesPage]
})
export class SearchServicesPageModule {}
