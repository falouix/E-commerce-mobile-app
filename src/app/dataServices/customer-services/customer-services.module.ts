import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerServicesPageRoutingModule } from './customer-services-routing.module';

import { CustomerServicesPage } from './customer-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerServicesPageRoutingModule
  ],
  declarations: [CustomerServicesPage]
})
export class CustomerServicesPageModule {}
