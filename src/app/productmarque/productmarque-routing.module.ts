import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductmarquePage } from './productmarque.page';

const routes: Routes = [
  {
    path: '',
    component: ProductmarquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductmarquePageRoutingModule {}
