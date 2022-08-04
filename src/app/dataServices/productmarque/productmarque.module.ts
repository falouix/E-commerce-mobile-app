import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductmarquePageRoutingModule } from './productmarque-routing.module';

import { ProductmarquePage } from './productmarque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductmarquePageRoutingModule
  ],
  declarations: [ProductmarquePage]
})
export class ProductmarquePageModule {}
