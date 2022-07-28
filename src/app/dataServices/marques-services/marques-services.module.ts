import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarquesServicesPageRoutingModule } from './marques-services-routing.module';

import { MarquesServicesPage } from './marques-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarquesServicesPageRoutingModule
  ],
  declarations: [MarquesServicesPage]
})
export class MarquesServicesPageModule {}
