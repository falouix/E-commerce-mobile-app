import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerServicesPage } from './customer-services.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerServicesPageRoutingModule {}
