import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsServicesPage } from './products-services.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsServicesPageRoutingModule {}
