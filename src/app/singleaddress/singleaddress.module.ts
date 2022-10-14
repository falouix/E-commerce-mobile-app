import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleaddressPageRoutingModule } from './singleaddress-routing.module';

import { SingleaddressPage } from './singleaddress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleaddressPageRoutingModule
  ],
  declarations: [SingleaddressPage]
})
export class SingleaddressPageModule {}
