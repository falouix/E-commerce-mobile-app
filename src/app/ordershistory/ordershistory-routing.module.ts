import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdershistoryPage } from './ordershistory.page';

const routes: Routes = [
  {
    path: '',
    component: OrdershistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdershistoryPageRoutingModule {}
