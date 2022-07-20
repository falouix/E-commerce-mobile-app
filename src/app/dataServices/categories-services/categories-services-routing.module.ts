import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesServicesPage } from './categories-services.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesServicesPageRoutingModule {}
