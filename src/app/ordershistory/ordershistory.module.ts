import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdershistoryPageRoutingModule } from './ordershistory-routing.module';

import { OrdershistoryPage } from './ordershistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdershistoryPageRoutingModule
  ],
  declarations: [OrdershistoryPage]
})
export class OrdershistoryPageModule {}
